import {getRandomNumber} from './utils/common';
import {render} from "./utils/render";
import FooterStats from './components/footer-stats';
import {getRandomProfile} from "./mocks/profile";
import {getRandomFilm} from "./mocks/film";
import UserProfile from "./components/user-profile";
import Menu from "./components/menu";
import {generateStats} from "./mocks/stats";
import PageController from "./controllers/page";

const [FILMS_COUNT_MIN, FILMS_COUNT_MAX] = [15, 20];
const FILMS_COUNT = getRandomNumber(FILMS_COUNT_MIN, FILMS_COUNT_MAX);

const isEmpty = getRandomNumber(0, 5) === 0;
const films = isEmpty ? [] : new Array(FILMS_COUNT).fill(0).map(getRandomFilm);
const filmsStats = generateStats(films);

const headerNode = document.querySelector(`.header`);
const mainNode = document.querySelector(`.main`);
const footerNode = document.querySelector(`.footer`);

const randomProfile = getRandomProfile();
render(headerNode, new UserProfile(randomProfile));

const menu = new Menu(filmsStats);
menu.setFilterChangeHandler(() => {}); // mock
menu.setStatsHandler(() => {}); // mock
render(mainNode, menu);

render(footerNode, new FooterStats(films.length));

new PageController(mainNode).render(films);
