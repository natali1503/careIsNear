export const generatePages = (currentPage: number, totalPages: number, range: number) => {
  const pages = [];
  const halfRange = Math.floor(range / 2);

  let start = Math.max(1, currentPage - halfRange);
  let end = Math.min(totalPages, currentPage + halfRange);

  if (end - start + 1 < range) {
    if (start === 1) {
      end = Math.min(totalPages, start + range - 1);
    } else if (end === totalPages) {
      start = Math.max(1, end - range + 1);
    }
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
};
