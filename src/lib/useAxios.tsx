import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useRef, useReducer } from "react";

type State<T> = {
  data?: T;
  error?: Error;
  loading: boolean;
};

type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

const useAxios = <T extends any>(
  url: string,
  config?: AxiosRequestConfig<T>
) => {
  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    loading: false,
  };

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...state, loading: true };
      case "fetched":
        return { ...state, data: action.payload, loading: false };
      case "error":
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const cancelRequest = useRef<boolean>(false);

  const fetchData = () => {
    dispatch({ type: "loading" });
    axios(url, config)
      .then((res) => {
        if (cancelRequest.current) return;

        dispatch({ type: "fetched", payload: res.data });
      })
      .catch((err) => {
        if (cancelRequest.current) return;

        dispatch({ type: "error", payload: err as Error });
      });
  };

  useEffect(() => {
    if (cancelRequest.current) return;

    fetchData();

    return () => {
      cancelRequest.current = true;
    };
  }, []);

  return {
    data: state.data,
    error: state.error,
    loading: state.loading,
    refetch: fetchData,
  };
};

export default useAxios;
