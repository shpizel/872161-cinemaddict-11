import {getRandomChoice, getRandomNumber} from './utils/common';
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
import LoadingMessage from "./components/loading-message";
import NoMoviesMessage from "./components/no-movies-message";
import {generateStats} from "./mocks/stats";

const FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;

const isEmpty = getRandomNumber(0, 3) === 0;
let films = isEmpty ? [] : new Array(getRandomNumber(15, 20)).fill(0).map(getRandomFilm);

const headerNode = document.querySelector(`.header`);
const randomProfile = getRandomProfile();

const userProfile = new UserProfile(randomProfile);
render(headerNode, userProfile);

const mainNode = document.querySelector(`.main`);
const menu = new Menu(generateStats(films));

menu.setFilterChangeHandler((filterType) => filterType); // mock
menu.setStatsHandler(() => true); // mock

render(mainNode, menu);

const sorter = new Sorter();
sorter.setSortTypeChangeHandler((sortType) => sortType); // mock
render(mainNode, sorter);

const filmsSection = new FilmsSection();
const primaryFilmsSection = new PrimaryFilmsSection();

render(mainNode, filmsSection);
const loadingMessage = new LoadingMessage(`Loading...`);
render(filmsSection.getElement(), loadingMessage);

const footerNode = document.querySelector(`.footer`);
render(footerNode, new FooterStats(films.length));

const prepareFilmCard = (film) => {
  if (!film) {
    return null;
  }
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

const popRandomFilm = () => {
  const randomFilm = getRandomChoice(films);
  if (!randomFilm) {
    return null;
  }
  films = films.filter((film) => film !== randomFilm);
  return randomFilm;
};

setTimeout(() => {
  remove(loadingMessage);

  if (films.length > 0) {
    for (let i = 0; i < FILMS_COUNT; i++) {
      const filmCard = prepareFilmCard(popRandomFilm());
      if (!filmCard) {
        remove(loadMoreButton);
        break;
      }
      render(primaryFilmsSection.getContainer(), filmCard);
    }

    render(filmsSection.getElement(), primaryFilmsSection);
    const loadMoreButton = new LoadMoreButton();
    render(primaryFilmsSection.getElement(), loadMoreButton);
    loadMoreButton.setClickHandler((evt) => {
      evt.preventDefault();
      for (let i = 0; i < FILMS_COUNT; i++) {
        const filmCard = prepareFilmCard(popRandomFilm());
        if (!filmCard) {
          remove(loadMoreButton);
          break;
        }
        render(primaryFilmsSection.getContainer(), filmCard);
      }
    });

    const topRatedSection = new ExtraFilmsSection(`Top rated`);
    for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
      const filmCard = prepareFilmCard(getRandomFilm());
      render(topRatedSection.getContainer(), filmCard);
    }
    render(filmsSection.getElement(), topRatedSection);

    const mostCommentedSection = new ExtraFilmsSection(`Most commented`);
    for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
      const filmCard = prepareFilmCard(getRandomFilm());
      render(mostCommentedSection.getContainer(), filmCard);
    }
    render(filmsSection.getElement(), mostCommentedSection);
  } else {
    render(filmsSection.getElement(), new NoMoviesMessage());
  }
}, getRandomNumber(250, 750));
