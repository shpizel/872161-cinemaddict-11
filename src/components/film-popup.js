import SmartAbstractComponent from "./smart-abstract-component";
import {EMOTIONS} from "../mocks/consts";

const optionsReleaseDate = {
  year: `numeric`,
  month: `long`,
  day: `numeric`,
};

export const getFilmPopupTemplate = (film, checkedEmotion) => {
  const emotionsChooser = EMOTIONS.map((emotion) => {
    return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${checkedEmotion === emotion ? `checked` : ``}>
      <label class="film-details__emoji-label" for="emoji-${emotion}">
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
    </label>`;
  }).join(``);
  const releaseDate = new Intl.DateTimeFormat(`en-GB`, optionsReleaseDate).format(film.releaseDate);
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${film.poster}" alt="">

              <p class="film-details__age">${film.minAge}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${film.title}</h3>
                  <p class="film-details__title-original">Original: ${film.originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${film.rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${film.director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${film.writers.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${film.actors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${film.duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${film.country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${film.genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``)}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${film.description.length > 139 ? `${film.description.slice(0, 139)}…` : film.description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" ${film.isAddedToWatchlist ? `checked` : ``} name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" ${film.isMarkedAsWatched ? `checked` : ``} name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" ${film.isMarkedAsFavorite ? `checked` : ``} name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${film.comments.map((comment) => `
              <li class="film-details__comment">
                <span class="film-details__comment-emoji">
                  <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
                </span>
                <div>
                  <p class="film-details__comment-text">${comment.text}</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">${comment.author}</span>
                    <span class="film-details__comment-day">${comment.date}</span>
                    <button class="film-details__comment-delete">Delete</button>
                  </p>
                </div>
              </li>`).join(`\n`)}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                ${checkedEmotion ? `<img src="./images/emoji/${checkedEmotion}.png" width="55" height="55" alt="emoji-${checkedEmotion}">` : ``}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                ${emotionsChooser}
              </div>
            </div>
          </section>
        </div>
      </form>
      </section>`
  );
};

export default class FilmPopup extends SmartAbstractComponent {
  constructor(film) {
    super();
    this._film = film;
    this._checkedEmoji = null;
    this._closeHandler = null;

    this._setEmojiListClickHandler();
  }

  getTemplate() {
    return getFilmPopupTemplate(this._film, this._checkedEmoji);
  }

  setWatchlistAdderClickHandler(handler) {
    const addToWatchlistButtonNode = this.getElement().querySelector(`input#watchlist`);
    addToWatchlistButtonNode.addEventListener(`change`, (evt) => {
      this._film.isAddedToWatchlist = evt.target.checked;
      handler(this._film);
    });
  }

  setWatchedMarkerClickHadler(handler) {
    const markAsWatchedButtonNode = this.getElement().querySelector(`input#watched`);
    markAsWatchedButtonNode.addEventListener(`change`, (evt) => {
      evt.preventDefault();
      this._film.isMarkedAsWatched = evt.target.checked;
      handler(this._film);
    });
  }

  setFavouriteMarkerClickHadler(handler) {
    const markAsFavouriteButtonNode = this.getElement().querySelector(`input#favorite`);
    markAsFavouriteButtonNode.addEventListener(`change`, (evt) => {
      evt.preventDefault();
      this._film.isMarkedAsFavorite = evt.target.checked;
      handler(this._film);
    });
  }

  setCloseHandler(handler) {
    this._closeHandler = handler;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
  }

  recoveryListeners() {
    this._setEmojiListClickHandler();
    this.setCloseHandler(this._closeHandler);
  }

  _setEmojiListClickHandler() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, (evt) => {
      evt.preventDefault();
      this._checkedEmoji = evt.target.value;
      this.rerender();
    });
  }
}
