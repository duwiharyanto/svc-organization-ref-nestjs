export const dateToStrLocal = (dateStr: Date) => {
  const date = new Date(dateStr);

  return date.toLocaleDateString('in-ID', { year: 'numeric', month: 'long', day: 'numeric' });
}