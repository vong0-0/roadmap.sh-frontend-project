export function convertUnixToTime(unixTimestamp){
  const timestamp = unixTimestamp * 1000;
  const date = new Date(timestamp);

  const options ={
    timeZone: 'Asia/Bangkok',
    hour: '2-digit',
    hour12: true,
  };

  return date.toLocaleTimeString('en-En', options);
}

export function convertUnixToDay(unixTimestamp){
  const timestamp = unixTimestamp * 1000;
  const date = new Date(timestamp);

  const options = {
    weekday: "long",
  }

  return date.toLocaleDateString('en-Us', options);
}

export function formatDate(dateValue){
  const date = new Date(dateValue);

  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const parts = formatter.formatToParts(date);
  const formattedDate = `${parts[0].value} ${parts[2].value}, ${parts[4].value} ${parts[6].value}`;

  return formattedDate;
}