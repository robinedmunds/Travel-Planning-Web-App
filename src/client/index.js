// js
import "./js/main.js";
import { serviceWorkerInit } from "./js/sw/swInit.js";

// styles
import "./styles/reset.css";
import "./styles/base.scss";
import "./styles/layout.scss";
import "./styles/travel-card.scss";
import "./styles/trip-form.scss";

// initialise service worker
serviceWorkerInit();
