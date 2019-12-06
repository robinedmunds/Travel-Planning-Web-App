function expireTravelCards() {
  const travelCards = document.querySelectorAll(".travel-card");

  if (travelCards.length > 0) {
    let arrayToSort = [];

    for (let card of travelCards) {
      const countdown = card.getAttribute("data-countdown");

      if (countdown < 0) {
        const cardArray = [countdown, card];
        arrayToSort.push(cardArray);
        card.remove();
      };
    };

    arrayToSort.sort((a, b) => {
      return a[0] - b[0];
    });
    arrayToSort.reverse();

    const fragment = document.createDocumentFragment();
    for (let cardArray of arrayToSort) {
      const card = cardArray[1];
      card.classList.add("travel-card-expired");
      fragment.appendChild(card);
    };

    const travelCardContainer = document.getElementById("travel-card-container");
    travelCardContainer.appendChild(fragment);
  };
};

export { expireTravelCards };
