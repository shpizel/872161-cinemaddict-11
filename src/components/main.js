const getMainNavigationHTML = (items) => `<nav class="main-navigation">
  <div class="main-navigation__items">${items.map((item) => {
    return `<a href="${item.href}" class="main-navigation__item${item.active ? ` main-navigation__item--active` : ``}">${item.anchor}${item.count ? ` <span class="main-navigation__item-count">${item.count}</span>` : ``}</a>`;
  }).join(`\n`)}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;

const getMainSorterHTML = (items) => `<ul class="sort">
  ${items.map((item) => {
    return `<li><a href="#" class="sort__button${(item.active) ? ` sort__button--active` : ``}">Sort by ${item.sortBy}</a></li>`;
  }).join(`\n`)}
</ul>`;

export const getMainMenuHTML = (mainMenuItems, sorterItems) => {
  return `${getMainNavigationHTML(mainMenuItems)}\n${getMainSorterHTML(sorterItems)}`;
};

export const getFilmCardHTML = (film) => `<article class="film-card">
  <h3 class="film-card__title">${film.title}</h3>
  <p class="film-card__rating">${film.rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${film.year}</span>
    <span class="film-card__duration">${film.duration}</span>
    <span class="film-card__genre">${film.genre}</span>
  </p>
  <img src="./images/posters/${film.poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${film.description.length > 139 ? `${film.description.slice(0, 139)}…` : film.description }</p>
  <a class="film-card__comments">${film.comments.length} comments</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
  </form>
</article>`;

const getShowmoreButtonHTML = () => `<button class="films-list__show-more">Show more</button>`;

const getMainFilmsSectionHTML = () => `<section class="films">
  <section class="films-list">
  </section>
</section>`;

export const getMainFilmsSectionFilmsContainerHTML = () => `
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  <div class="films-list__container">
  </div>
  ${getShowmoreButtonHTML()}`
;

export const getMainFilmsSectionExtraFilmsContainerHTML = () => `
  <section class="films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container">
    </div>
  </section>

  <section class="films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container">
    </div>
  </section>`
;

export const getMainFilmsSectionLoadingMsgHTML = () => `<h2 class="films-list__title">Loading...</h2>`;
export const getMainFilmsSectionEmptyMsgHTML = () => `<h2 class="films-list__title">There are no movies in our database</h2>`;

export const getMainHTML = (mainMenuItems, sorterItems) => {
  return `${getMainMenuHTML(mainMenuItems, sorterItems)}\n${getMainFilmsSectionHTML()}`;
};
