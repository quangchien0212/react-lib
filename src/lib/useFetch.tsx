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

type Cache<T> = Record<string, T>;

const useFetch = <T extends any>(url: string, options?: RequestInit) => {
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
  const cache = useRef<Cache<T>>({});
  const cancelRequest = useRef<boolean>(false);

  const fetchData = async () => {
    if (state.loading) return;

    dispatch({ type: "loading" });

    if (cache.current[url]) {
      const data = cache.current[url];
      dispatch({ type: "fetched", payload: data });
      return;
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = (await response.json()) as T;
      cache.current[url] = data;

      if (cancelRequest.current) return;

      dispatch({ type: "fetched", payload: data });
    } catch (error) {
      if (cancelRequest.current) return;

      dispatch({ type: "error", payload: error as Error });
    }
  };

  useEffect(() => {
    if (!url || cancelRequest.current) return;

    fetchData();
  }, [url, options]);

  useEffect(() => {
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

export default useFetch;
