import { travelCard } from "./travelCard";

// create dummy response object containing all data required to build output
// parse response data to DOM

const dummyRes = {
  city: "Pietermaritzburg",
  country: "South Africa",
  departDate: new Date(2020, 4-1, 24),
  picture: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Upland_South_Africa_Savanna.jpg",
  weather: {
    high: 32,
    low: 24,
    forecast: "Hot and sunny throughout the day. Wear a hat."
  }
};

const main = document.querySelector("main");
main.insertAdjacentHTML("afterbegin", travelCard(dummyRes))
