const countdownDaysCalc = (departDate) => {
  const msInDay = 24 * 60 * 60 * 1000;
  const difference = departDate - Date.now();
  return Math.ceil(difference / msInDay);
};

export { countdownDaysCalc };
