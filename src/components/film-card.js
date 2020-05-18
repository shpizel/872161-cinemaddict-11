import AbstractComponent from "./abstract-component.js";

const getFilmTemplate = (film) => {
  const addedToWatchlistClass = film.isAddedToWatchlist ? `film-card__controls-item--active` : ``;
  const markedAsWatchedClass = film.isMarkedAsWatched ? `film-card__controls-item--active` : ``;
  const markedAsFavoriteClass = film.isMarkedAsFavorite ? `film-card__controls-item--active` : ``;

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
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${markedAsWatchedClass}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${markedAsFavoriteClass}">Mark as favorite</button>
      </form>
      </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return getFilmTemplate(this._film);
  }

  setWatchlistAdderClickHandler(handler) {
    const addToWatchlistNode = this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`);
    addToWatchlistNode.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._film.isAddedToWatchlist = !this._film.isAddedToWatchlist;
      handler(this._film);
    });
  }

  setWatchedMarkerClickHadler(handler) {
    const markAsWatchedBtn = this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`);
    markAsWatchedBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._film.isMarkedAsWatched = !this._film.isMarkedAsWatched;
      handler(this._film);
    });
  }

  setFavouriteMarkerClickHadler(handler) {
    const markAsFavouriteBtn = this.getElement().querySelector(`.film-card__controls-item--favorite`);
    markAsFavouriteBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._film.isMarkedAsFavorite = !this._film.isMarkedAsFavorite;
      handler(this._film);
    });
  }

  setClickHandler(handler) {
    const commentsNode = this.getElement().querySelector(`.film-card__comments`);
    const posterNode = this.getElement().querySelector(`.film-card__poster`);
    commentsNode.addEventListener(`click`, handler);
    posterNode.addEventListener(`click`, handler);
  }
}

