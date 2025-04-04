//format date to ukrainian format
//i.e. 12 березня 2025
export const formattedDate = (date: string) => {
  return new Date(date).toLocaleString("uk-UA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formattedDateWithHours = (date: string) => {
  return new Date(date).toLocaleString("uk-UA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
