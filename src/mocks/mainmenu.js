import {getRandomNumber} from "../components/utils";

export const mainMenuItems = [
  {
    anchor: `All movies`,
    href: `#all`,
    active: true,
    count: null
  },
  {
    anchor: `Watchlist`,
    href: `#watchlist`,
    active: false,
    count: getRandomNumber(1, 100),
  },
  {
    anchor: `History`,
    href: `#history`,
    active: false,
    count: getRandomNumber(1, 100),
  },
  {
    anchor: `Favourites`,
    href: `#favourites`,
    active: false,
    count: getRandomNumber(1, 100),
  }
];
