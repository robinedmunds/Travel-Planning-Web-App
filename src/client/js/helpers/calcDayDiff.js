const calcDayDifference = (date1, date2) => {
  const msInDay = 24 * 60 * 60 * 1000;
  let difference;
  if (date1 >= date2) {
    difference = date1 - date2;
  } else {
    difference = date2 - date1;
  };
  return Math.ceil(difference / msInDay);
};

export { calcDayDifference };
