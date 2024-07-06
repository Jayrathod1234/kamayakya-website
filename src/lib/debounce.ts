let timeout: string | number | NodeJS.Timeout;
export function debounce(func: () => void, delay: number) {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    func();
  }, delay);
}
