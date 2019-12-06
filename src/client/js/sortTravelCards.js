function sortTravelCards() {
  const travelCards = document.querySelectorAll(".travel-card");

  if (travelCards.length > 1) {
    let arrayToSort = [];

    for (let card of travelCards) {
      const dataCountdown = card.getAttribute("data-countdown");
      const cardArray = [dataCountdown, card];
      arrayToSort.push(cardArray);
      card.remove();
    };

    arrayToSort.sort((a, b) => {
      return a[0] - b[0];
    });

    const fragment = document.createDocumentFragment();

    for (let cardArray of arrayToSort) {
      fragment.appendChild(cardArray[1]);
    };

    const travelCardContainer = document.getElementById("travel-card-container");
    travelCardContainer.appendChild(fragment);
  };
};

export { sortTravelCards };
