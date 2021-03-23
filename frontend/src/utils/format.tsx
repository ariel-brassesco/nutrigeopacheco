export const formatCurrency = (data: number, decimals: number = 2) => {
  return `$${data.toFixed(decimals)}`;
};
