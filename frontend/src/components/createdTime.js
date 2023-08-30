export function timeSince(dateString) {
  const then = new Date(dateString);
  const now = new Date();

  // Calculate the difference in milliseconds
  const difference = now - then;

  // Convert difference from milliseconds to days
  const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (daysDifference < 7) {
    if (daysDifference === 0) return "Today";
    if (daysDifference === 1) return "1 day ago";
    return `${daysDifference} days ago`;
  } else {
    const weeks = Math.floor(daysDifference / 7);
    const remainingDays = daysDifference % 7;

    if (weeks === 1 && remainingDays === 0) return "1 week ago";
    if (remainingDays === 0) return `${weeks} weeks ago`;
    return `${weeks} weeks, ${remainingDays} days ago`;
  }
}
