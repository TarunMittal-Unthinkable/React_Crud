const handlePreviousPage = () => {
  if (page > 1) setPage(page - 1);
};

const handleNextPage = () => {
  if (page < totalPages) setPage(page + 1);
};