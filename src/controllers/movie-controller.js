import FilmCard from "../components/film-card";
import FilmPopup from "../components/film-popup";
import {appendChild, remove, render, replace} from "../utils/render";

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._isPopupOpened = false;
    this._film = null;
    this._filmCard = null;
    this._filmPopup = null;

    this._showFilmPopup = this._showFilmPopup.bind(this);
    this._closeFilmPopup = this._closeFilmPopup.bind(this);
    this._documentKeydownHandler = this._documentKeydownHandler.bind(this);
  }

  render(film) {
    this._film = film;

    if (this._filmCard && !this._isPopupOpened) {
      const oldFilmCard = this._filmCard;
      this._filmCard = new FilmCard(film);
      replace(this._filmCard, oldFilmCard);
      this._filmPopup = new FilmPopup(film);
    }

    if (this._filmCard && this._isPopupOpened) {
      const oldFilmCard = this._filmCard;
      this._filmCard = new FilmCard(film);
      replace(this._filmCard, oldFilmCard);
    }

    if (!this._filmCard) {
      this._filmCard = new FilmCard(film);
      render(this._container, this._filmCard);

      this._filmPopup = new FilmPopup(film);
    }

    this._filmCard.setClickHandler(this._showFilmPopup);
    this._filmCard.setWatchlistAdderClickHandler((newFilm) => this._onDataChange(this._film, newFilm));
    this._filmCard.setWatchedMarkerClickHadler((newFilm) => this._onDataChange(this._film, newFilm));
    this._filmCard.setFavouriteMarkerClickHadler((newFilm) => this._onDataChange(this._film, newFilm));
  }

  _documentKeydownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._closeFilmPopup();
    }
  }

  _closeFilmPopup() {
    this._isPopupOpened = false;
    remove(this._filmPopup);
    document.removeEventListener(`keydown`, this._documentKeydownHandler);
  }

  _showFilmPopup() {
    this._onViewChange();
    this._isPopupOpened = true;

    this._filmPopup.setCloseHandler(this._closeFilmPopup);
    this._filmPopup.setFavouriteMarkerClickHadler((film) => this._onDataChange(this._film, film));
    this._filmPopup.setWatchedMarkerClickHadler((film) => this._onDataChange(this._film, film));
    this._filmPopup.setWatchlistAdderClickHandler((film) => this._onDataChange(this._film, film));

    document.addEventListener(`keydown`, this._documentKeydownHandler);
    appendChild(this._filmPopup);
  }

  setDefaultView() {
    if (this._isPopupOpened) {
      this._closeFilmPopup();
    }
  }
}
