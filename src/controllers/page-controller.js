import {remove, render} from "../utils/render";
import ExtraFilmsSection from "../components/extra-films-section";
import LoadMoreButton from "../components/load-more-button";
import {getRandomNumber} from "../utils/common";
import Message, {MessageType} from "../components/message";
import FilmsSection from "../components/films-section";
import PrimaryFilmsSection from "../components/primary-films-section";
import Sorter, {SortType} from "../components/sorter";
import MovieController from "./movie-controller";

const FILMS_PORTION_COUNT = 5;
const EXTRA_SECTIONS = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`
};
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
    this._showedMoviesControllers = [];
    this._showedExtraMoviesControllers = [];

    this._films = [];
    this._cursor = 0;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sorter.setSortTypeChangeHandler(this._onSortTypeChange.bind(this));
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
    if (this._cursor >= this._films.length) {
      return;
    }
    this._loadMoreButton.setClickHandler((evt) => {
      evt.preventDefault();
      this._showFilmsPortion(this._getSortedFilms(this._sorter.sortType));
      if (this._cursor >= this._films.length) {
        remove(this._loadMoreButton);
        return;
      }
    });
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

  _getSortedFilms(sortType) {
    let sortedFilms = this._films.slice();
    switch (sortType) {
      case SortType.DEFAULT:
        break;
      case SortType.BY_DATE:
        sortedFilms.sort((a, b) => b.releaseDate - a.releaseDate);
        break;
      case SortType.BY_RATING:
        sortedFilms.sort((a, b) => b.rating - a.rating);
        break;
    }
    return sortedFilms;
  }

  _onSortTypeChange(sortType) {
    this._cursor = 0;
    this._showedMoviesControllers = [];
    this._emptyFilmsContainer();
    this._removeLoadMoreButton();
    this._showFilmsPortion(this._getSortedFilms(sortType));
    this._showLoadMoreButton();
  }

  render(films) {
    this._films = films;
    this._showSorter();
    this._showFilmsSection();
    this._showPrimaryFilmsSection();
    this._showLoadingMessage();
    const mockTimeout = getRandomNumber(250, 750);
    setTimeout(() => {
      this._removeLoadingMessage();

      if (films.length === 0) {
        this._showNoMoviesMessage();
        return;
      }

      this._showFilmsPortion(films);
      this._showFilmsContainer();
      this._showLoadMoreButton();

      Object.values(EXTRA_SECTIONS).forEach((section) => {
        const extraSection = new ExtraFilmsSection(section);

        let _films = this._films.slice();
        if (section === EXTRA_SECTIONS.TOP_RATED) {
          _films.sort((a, b) => b.rating - a.rating);

          /* Блок «Top rated movies» не отображается, если у всех фильмов рейтинг равен нулю. */
          if (_films.rating === 0) {
            _films = [];
          }
        } else if (section === EXTRA_SECTIONS.MOST_COMMENTED) {
          _films.sort((a, b) => b.comments.length - a.comments.length);

          /* Блок «Most commented» не отображается, если отсутствуют фильмы с комментариями. */
          if (_films[0].comments.length === 0) {
            _films = [];
          }
        }

        if (_films.length > 0) {
          _films.slice(0, EXTRA_FILMS_COUNT).forEach((film) => {
            const movieController = new MovieController(extraSection.getContainer(), this._onDataChange, this._onViewChange);
            this._showedExtraMoviesControllers.push(movieController);
            movieController.render(film);
          });
          render(this._filmsSection.getElement(), extraSection);
        }
      });
    }, mockTimeout);
  }

  _showFilmsPortion(films) {
    const container = this._primaryFilmsSection.getContainer();
    films.slice(this._cursor, this._cursor + FILMS_PORTION_COUNT).forEach((film) => {
      const movieController = new MovieController(container, this._onDataChange, this._onViewChange);
      this._showedMoviesControllers.push(movieController);
      movieController.render(film);
    });
    this._cursor += FILMS_PORTION_COUNT;
  }

  _onDataChange(oldData, newData) {
    const index = this._films.findIndex((film) => film === oldData);
    if (index === -1) {
      return;
    }

    this._films[index] = newData;
    // this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    let controllerIndex = this._showedMoviesControllers.findIndex((controller) => controller._film === oldData);
    if (controllerIndex >= 0) {
      this._showedMoviesControllers[controllerIndex].render(newData);
    }

    controllerIndex = this._showedExtraMoviesControllers.findIndex((controller) => controller._film === oldData);
    if (controllerIndex >= 0) {
      this._showedExtraMoviesControllers[controllerIndex].render(newData);
    }
  }

  _onViewChange() {
    this._showedMoviesControllers.forEach((controller) => controller.setDefaultView());
  }
}
