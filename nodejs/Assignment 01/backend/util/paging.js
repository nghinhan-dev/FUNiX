module.exports = function pagination(page) {
  const start = (page - 1) * 20;
  const end = start + 20;

  return {
    start,
    currentPage: page,
    end,
  };
};
