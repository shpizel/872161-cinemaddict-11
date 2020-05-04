import AbstractComponent from "./abstract-component.js";
import {remove, render} from "../utils/render";

export const getFilmPopupTemplate = (film) => {
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
                  <td class="film-details__cell">30 March 1945</td>
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
              <div for="add-emoji" class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
      </section>`
  );
};

export default class FilmPopup extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  display() {
    const closePopupHandler = () => {
      remove(this);
      document.removeEventListener(`keydown`, documentKeydownHandler);
    };

    const documentKeydownHandler = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        closePopupHandler();
      }
    };

    this.setCloseHandler(closePopupHandler);
    this.setFavouriteMarkerHadler();
    this.setWatchedMarkerHadler();
    this.setWatchlistAdderHandler();

    render(document.body, this);
    document.addEventListener(`keydown`, documentKeydownHandler);
  }

  getTemplate() {
    return getFilmPopupTemplate(this._film);
  }

  setWatchlistAdderHandler() {
    const addToWatchlistNode = this.getElement().querySelector(`input#watchlist`);
    addToWatchlistNode.addEventListener(`change`, (evt) => {
      evt.preventDefault();

      this._film.isAddedToWatchlist = evt.target.checked;
    });
  }

  setWatchedMarkerHadler() {
    const markAsWatchedBtn = this.getElement().querySelector(`input#watched`);
    markAsWatchedBtn.addEventListener(`change`, (evt) => {
      evt.preventDefault();

      this._film.isMarkedAsWatched = evt.target.checked;
    });
  }

  setFavouriteMarkerHadler() {
    const markAsFavouriteBtn = this.getElement().querySelector(`input#favorite`);
    markAsFavouriteBtn.addEventListener(`change`, (evt) => {
      evt.preventDefault();

      this._film.isMarkedAsFavorite = evt.target.checked;
    });
  }

  setCloseHandler(hander) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, hander);
  }
}
