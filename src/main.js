import {getRandomNumber} from './utils/common';
import {render, remove} from "./utils/render";
import FilmCard from './components/film-card';
import FooterStats from './components/footer-stats';
import FilmPopup from './components/film-popup';
import {getRandomProfile} from "./mocks/profile";
import {getRandomFilm} from "./mocks/film";
import LoadMoreButton from "./components/load-more-button";
import UserProfile from "./components/user-profile";
import Sorter from "./components/sorter";
import Menu from "./components/menu";
import PrimaryFilmsSection from "./components/primary-films-section";
import ExtraFilmsSection from "./components/extra-films-section";
import FilmsSection from "./components/films-section";
import Message from "./components/message";
import {generateStats} from "./mocks/stats";

const [FILMS_COUNT_MIN, FILMS_COUNT_MAX] = [15, 20];
const FILMS_PORTION_COUNT = 5;
const EXTRA_SECTIONS = [`Top rated`, `Most commented`];
const EXTRA_FILMS_COUNT = 2;

const Messages = {
  LOADING_MESSAGE: `Loading...`,
  NO_MOVIES_MESSAGE: `There are no movies in our database`,
};

const isEmpty = getRandomNumber(0, 3) === 0;
const films = isEmpty ? [] : new Array(getRandomNumber(FILMS_COUNT_MIN, FILMS_COUNT_MAX)).fill(0).map(getRandomFilm);
const filmsStats = generateStats(films);

const headerNode = document.querySelector(`.header`);
const randomProfile = getRandomProfile();

const userProfile = new UserProfile(randomProfile);
render(headerNode, userProfile);

const mainNode = document.querySelector(`.main`);
const menu = new Menu(filmsStats);

menu.setFilterChangeHandler((filterType) => filterType); // mock
menu.setStatsHandler(() => true); // mock

render(mainNode, menu);

const sorter = new Sorter();
sorter.setSortTypeChangeHandler((sortType) => sortType); // mock
render(mainNode, sorter);

const filmsSection = new FilmsSection();
const primaryFilmsSection = new PrimaryFilmsSection();

render(mainNode, filmsSection);
const loadingMessage = new Message(Messages.LOADING_MESSAGE);
render(filmsSection.getElement(), loadingMessage);

const footerNode = document.querySelector(`.footer`);
render(footerNode, new FooterStats(films.length));

const prepareFilmCard = (film) => {
  const filmCard = new FilmCard(film);
  filmCard.setFavouriteMarkerHadler(() => false);
  filmCard.setWatchedMarkerHadler(() => false);
  filmCard.setWatchlistAdderHandler(() => false);
  filmCard.setClickHandler(() => {
    const filmPopup = new FilmPopup(film);
    filmPopup.display();
  });
  return filmCard;
};

const loadMoreButton = new LoadMoreButton();

let cursor = 0;
const showPortion = () => {
  if (cursor + FILMS_PORTION_COUNT >= films.length) {
    remove(loadMoreButton);
  }
  films.slice(cursor, cursor + FILMS_PORTION_COUNT).forEach((film) => {
    const filmCard = prepareFilmCard(film);
    render(primaryFilmsSection.getContainer(), filmCard);
  });
  cursor += FILMS_PORTION_COUNT;
};

setTimeout(() => {
  remove(loadingMessage);
  if (films.length > 0) {
    showPortion();
    loadMoreButton.setClickHandler((evt) => {
      evt.preventDefault();
      showPortion();
    });
    render(primaryFilmsSection.getElement(), loadMoreButton);
    render(filmsSection.getElement(), primaryFilmsSection);

    EXTRA_SECTIONS.forEach((section) => {
      const extraSection = new ExtraFilmsSection(section);
      for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
        const filmCard = prepareFilmCard(getRandomFilm());
        render(extraSection.getContainer(), filmCard);
      }
      render(filmsSection.getElement(), extraSection);
    });
  } else {
    render(filmsSection.getElement(), new Message(Messages.NO_MOVIES_MESSAGE));
  }
}, getRandomNumber(250, 750));
