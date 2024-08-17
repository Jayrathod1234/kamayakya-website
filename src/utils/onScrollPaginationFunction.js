export function onScrollPaginationFunction(fetchNextPage) {
  // Create a new IntersectionObserver
  return new IntersectionObserver(
    (entries) => {
      // Check if the observed element is intersecting with the viewport
      if (entries[0].isIntersecting) {
        fetchNextPage(); // Fetch the next page of data when element is intersecting
      }
    },
    { threshold: 1 } // Trigger when the observed element is fully in the viewport
  );
}
