import AbstractComponent from "./abstract-component";
import {capitalize} from "../utils/common";

const LINK_ACTIVE_CLASS_NAME = `main-navigation__item--active`;

const getMenuTemplate = (items) => {
  const navigationHTML = Object.entries(items).map((item) => {
    const [title, count] = item;
    const preparedAnchor = `${capitalize(title)} ${`<span class="main-navigation__item-count">${count}</span>`}`;
    return `<a href="#${title}" menu-item="${title}" class="main-navigation__item">${preparedAnchor}</a>`;
  }).join(``);

  return (
    `<nav class="main-navigation">
       <div class="main-navigation__items">
         <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
         ${navigationHTML}
       </div>
       <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  constructor(items) {
    super();
    this._items = items;
  }

  getTemplate() {
    return getMenuTemplate(this._items);
  }

  setFilterChangeHandler(handler) {
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const target = evt.target;
      if (target.tagName === `A` && !target.classList.contains(LINK_ACTIVE_CLASS_NAME)) {
        this.getElement().querySelector(`.${LINK_ACTIVE_CLASS_NAME}`).classList.remove(LINK_ACTIVE_CLASS_NAME);
        target.classList.add(LINK_ACTIVE_CLASS_NAME);
        handler(target.getAttribute(`menu-item`));
      }
    });
  }

  setStatsHandler(handler) {
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, (evt) => {
      evt.preventDefault();

      handler(`stats`);
    });
  }
}

