import {remove, render} from "../utils/render";
import ExtraFilmsSection from "../components/extra-films-section";
import {getRandomFilm} from "../mocks/film";
import FilmCard from "../components/film-card";
import FilmPopup from "../components/film-popup";
import LoadMoreButton from "../components/load-more-button";
import {getRandomNumber} from "../utils/common";
import Message from "../components/message";
import FilmsSection from "../components/films-section";
import PrimaryFilmsSection from "../components/primary-films-section";
import SorterController from "./sorter";

const MessageType = {
  LOADING: `Loading...`,
  NO_MOVIES: `There are no movies in our database`,
};

const FILMS_PORTION_COUNT = 5;
const EXTRA_SECTIONS = [`Top rated`, `Most commented`];
const EXTRA_FILMS_COUNT = 2;

const prepareFilmCard = (film) => {
  const filmCard = new FilmCard(film);
  // filmCard.setFavouriteMarkerHadler(() => {});
  // filmCard.setWatchedMarkerHadler(() => {});
  // filmCard.setWatchlistAdderHandler(() => {});
  filmCard.setClickHandler(() => {
    const filmPopup = new FilmPopup(film);
    filmPopup.display();
  });
  return filmCard;
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._filmsSection = new FilmsSection();
    this._primaryFilmsSection = new PrimaryFilmsSection();
    this._loadMoreButton = new LoadMoreButton();
    this._loadingMessage = new Message(MessageType.LOADING);
    this._noMoviesMessage = new Message(MessageType.NO_MOVIES);
    this._sorterController = new SorterController(this._container);

    this._cursor = 0;
  }

  showFilmsSection() {
    render(this._container, this._filmsSection);
  }

  showPrimaryFilmsSection() {
    render(this._filmsSection.getElement(), this._primaryFilmsSection);
  }

  showLoadingMessage() {
    render(this._filmsSection.getElement(), this._loadingMessage);
  }

  removeLoadingMessage() {
    remove(this._loadingMessage);
  }

  showNoMovies() {
    render(this._filmsSection.getElement(), this._noMoviesMessage);
  }

  showLoadMoreButton() {
    render(this._primaryFilmsSection.getElement(), this._loadMoreButton);
  }

  removeLoadMoreButton() {
    remove(this._loadMoreButton);
  }

  render(films) {
    this._sorterController.render();
    this.showFilmsSection();
    this.showLoadingMessage();
    const mockTimeout = getRandomNumber(250, 750);
    setTimeout(() => {
      this.removeLoadingMessage();
      this.showPrimaryFilmsSection();
      if (films.length > 0) {
        this.showPortion(films);
        this._loadMoreButton.setClickHandler((evt) => {
          evt.preventDefault();
          this.showPortion(films);
        });
        this.showLoadMoreButton();

        EXTRA_SECTIONS.forEach((section) => {
          const extraSection = new ExtraFilmsSection(section);
          render(this._filmsSection.getElement(), extraSection);
          for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
            const filmCard = prepareFilmCard(getRandomFilm());
            render(extraSection.getContainer(), filmCard);
          }
        });
      } else {
        this.showNoMovies();
      }
    }, mockTimeout);
  }

  showPortion(films) {
    if (this._cursor + FILMS_PORTION_COUNT >= films.length) {
      remove(this._loadMoreButton);
    }

    films.slice(this._cursor, this._cursor + FILMS_PORTION_COUNT).forEach((film) => {
      const filmCard = prepareFilmCard(film);
      render(this._primaryFilmsSection.getContainer(), filmCard);
    });
    this._cursor += FILMS_PORTION_COUNT;
  }
}
