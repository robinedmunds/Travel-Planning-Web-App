"use strict";

const calcDayDifference = (date1, date2) => {
  const msInDay = 24 * 60 * 60 * 1000;
  let difference;
  difference = date1 - date2;
  return Math.ceil(difference / msInDay);
};

export { calcDayDifference };
