import AbstractComponent from "./abstract-component.js";

const getFilmTemplate = (film) => {
  const addedToWatchlistClass = film.isAddedToWatchlist ? `film-card__controls-item--active` : ``;
  const markAsWatchedClass = film.isMarkAsWatched ? `film-card__controls-item--active` : ``;
  const markAsFavoriteClass = film.isMarkAsFavorite ? `film-card__controls-item--active` : ``;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${film.title}</h3>
      <p class="film-card__rating">${film.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${film.year}</span>
        <span class="film-card__duration">${film.duration}</span>
        <span class="film-card__genre">${film.genre}</span>
      </p>
      <img src="./images/posters/${film.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${film.description.length > 139 ? `${film.description.slice(0, 139)}…` : film.description}</p>
      <a class="film-card__comments">${film.comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${addedToWatchlistClass}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${markAsWatchedClass}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${markAsFavoriteClass}">Mark as favorite</button>
      </form>
      </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
    this._clickHandler = null;
  }
  getTemplate() {
    return getFilmTemplate(this._film);
  }

  setWatchlistAdderHandler(handler) {
    const addToWatchlistNode = this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`);
    addToWatchlistNode.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      this._film.isAddedToWatchlist = !this._film.isAddedToWatchlist;

      handler(`watchlist`);
    });
  }

  setWatchedMarkerHadler(handler) {
    const markAsWatchedBtn = this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`);
    markAsWatchedBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      this._film.isMarkAsWatched = !this._film.isMarkAsWatched;

      handler(`watched`);
    });
  }

  setFavouriteMarkerHadler(handler) {
    const markAsFavouriteBtn = this.getElement().querySelector(`.film-card__controls-item--favorite`);
    markAsFavouriteBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      this._film.isMarkAsFavorite = !this._film.isMarkAsFavorite;

      handler(`favourite`);
    });
  }

  setClickHandler(handler) {
    this._clickHandler = handler;
    const commentsNode = this.getElement().querySelector(`.film-card__comments`);
    const posterNode = this.getElement().querySelector(`.film-card__poster`);
    commentsNode.addEventListener(`click`, handler);
    posterNode.addEventListener(`click`, handler);
  }
}

