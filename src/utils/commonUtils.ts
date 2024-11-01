export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number = 500,
) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>): void {
    if (timeoutId) {
      clearTimeout(timeoutId); // Clear any existing timeout
    }

    timeoutId = setTimeout(() => {
      func(...args); // Call the original function with the latest arguments
    }, delay);
  };
}

export const getImageUrl = (size: string, imageId: string) => {
  return `https://image.tmdb.org/t/p/${size}/${imageId}.jpg`;
};
