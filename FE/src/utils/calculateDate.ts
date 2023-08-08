export function calculateMinutesBetweenDates(startAt: string, endAt: string) {
  const startDate = new Date(startAt);
  const endDate = new Date(endAt);

  const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
  const differenceInMinutes = Math.floor(differenceInMilliseconds / 1000 / 60);

  return differenceInMinutes;
}

export function formatDateTime(dateTime: string) {
  const dateObject = new Date(dateTime);

  const year = String(dateObject.getFullYear()).slice(-2);
  const month = dateObject.getMonth() + 1;
  const date = dateObject.getDate();

  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  return `${year}-${month}-${date} / ${hours}시 ${minutes}분`;
}
