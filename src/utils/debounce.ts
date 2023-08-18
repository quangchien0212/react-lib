function debounce(fn: Function, wait: number) {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      return fn(...args)
    }, wait);
  };
}

export default debounce;