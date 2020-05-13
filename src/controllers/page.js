import {remove, render} from "../utils/render";
import ExtraFilmsSection from "../components/extra-films-section";
import {getRandomFilm} from "../mocks/film";
import FilmCard from "../components/film-card";
import FilmPopup from "../components/film-popup";
import LoadMoreButton from "../components/load-more-button";
import {getRandomNumber} from "../utils/common";
import Message, {MessageType} from "../components/message";
import FilmsSection from "../components/films-section";
import PrimaryFilmsSection from "../components/primary-films-section";
import Sorter, {SortType} from "../components/sorter";

const FILMS_PORTION_COUNT = 5;
const EXTRA_SECTIONS = [`Top rated`, `Most commented`];
const EXTRA_FILMS_COUNT = 2;

export default class PageController {
  constructor(container) {
    this._container = container;

    this._filmsSection = new FilmsSection();
    this._primaryFilmsSection = new PrimaryFilmsSection();
    this._loadMoreButton = new LoadMoreButton();
    this._loadingMessage = new Message(MessageType.LOADING);
    this._noMoviesMessage = new Message(MessageType.NO_MOVIES);
    this._sorter = new Sorter();

    this._cursor = 0;
  }

  _showFilmsSection() {
    render(this._container, this._filmsSection);
  }

  _showPrimaryFilmsSection() {
    render(this._filmsSection.getElement(), this._primaryFilmsSection);
  }

  _showLoadingMessage() {
    render(this._primaryFilmsSection.getElement(), this._loadingMessage);
  }

  _removeLoadingMessage() {
    remove(this._loadingMessage);
  }

  _showNoMoviesMessage() {
    render(this._primaryFilmsSection.getElement(), this._noMoviesMessage);
  }

  _showLoadMoreButton() {
    render(this._primaryFilmsSection.getElement(), this._loadMoreButton);
  }

  _removeLoadMoreButton() {
    remove(this._loadMoreButton);
  }

  _showFilmsContainer() {
    this._primaryFilmsSection.getContainer().classList.remove(`visually-hidden`);
  }

  _emptyFilmsContainer() {
    this._primaryFilmsSection.getContainer().innerHTML = ``;
  }

  _showSorter() {
    render(this._container, this._sorter);
  }

  _showFilmCard(film, container) {
    const filmCard = new FilmCard(film);
    // filmCard.setFavouriteMarkerHadler(() => {});
    // filmCard.setWatchedMarkerHadler(() => {});
    // filmCard.setWatchlistAdderHandler(() => {});
    filmCard.setClickHandler(() => {
      const filmPopup = new FilmPopup(film);
      filmPopup.display();
    });

    render(container, filmCard);
  }

  render(films) {
    this._showSorter();
    this._showFilmsSection();
    this._showPrimaryFilmsSection();
    this._showLoadingMessage();
    const mockTimeout = getRandomNumber(250, 750);
    setTimeout(() => {
      this._removeLoadingMessage();
      if (films.length > 0) {
        this._showPortion(films);
        this._showFilmsContainer();
        this._loadMoreButton.setClickHandler((evt) => {
          evt.preventDefault();
          this._showPortion(films);
        });
        this._showLoadMoreButton();

        this._sorter.setSortTypeChangeHandler((sortType) => {
          let sortedFilms;
          switch (sortType) {
            case SortType.DEFAULT:
              sortedFilms = films.slice();
              break;
            case SortType.BY_DATE:
              sortedFilms = films.slice().sort((a, b) => b.year - a.year);
              /* возможно тут год не подходит */
              break;
            case SortType.BY_RATING:
              sortedFilms = films.slice().sort((a, b) => b.rating - a.rating);
              break;
          }
          this._cursor = 0;
          this._emptyFilmsContainer();
          this._removeLoadMoreButton();
          this._showPortion(sortedFilms);
          this._showFilmsContainer();
          this._loadMoreButton.setClickHandler((evt) => {
            evt.preventDefault();
            this._showPortion(sortedFilms);
          });
          this._showLoadMoreButton();
        });

        EXTRA_SECTIONS.forEach((section) => {
          const extraSection = new ExtraFilmsSection(section);
          render(this._filmsSection.getElement(), extraSection);
          for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
            this._showFilmCard(getRandomFilm(), extraSection.getContainer());
          }
        });
      } else {
        this._showNoMoviesMessage();
      }
    }, mockTimeout);
  }

  _showPortion(films) {
    if (this._cursor + FILMS_PORTION_COUNT >= films.length) {
      remove(this._loadMoreButton);
    }

    films.slice(this._cursor, this._cursor + FILMS_PORTION_COUNT).forEach((film) => {
      this._showFilmCard(film, this._primaryFilmsSection.getContainer());
    });
    this._cursor += FILMS_PORTION_COUNT;
  }
}
