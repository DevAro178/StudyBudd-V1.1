export function formatNumber(num) {
  // If the number is less than 1000, simply format it with commas
  if (num < 1000) {
    return new Intl.NumberFormat().format(num);
  }

  // If the number is greater than or equal to 1000, format it in the "X.Yk" style
  let formatted = num / 1000;
  formatted = formatted.toFixed(1) + "k";
  return formatted;
}
