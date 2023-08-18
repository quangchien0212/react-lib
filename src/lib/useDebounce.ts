import { useEffect } from "react";

export const useDebounced = (effect: Function, delay: number, deps: any[]) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      effect();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [effect, deps, delay]);
};

export default useDebounced;
