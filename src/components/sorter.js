import AbstractComponent from "./abstract-component";

const LINK_ACTIVE_CLASS_NAME = `sort__button--active`;

const SortType = {
  DEFAULT: `default`,
  BY_DATE: `date`,
  BY_RATING: `rating`,
};

const getSorterTemplate = () => {
  const sortItems = Object.values(SortType).map((type) => {
    const active = type === SortType.DEFAULT;
    const className = `sort__button${(active) ? ` ${LINK_ACTIVE_CLASS_NAME}` : ``}`;

    return (
      `<li>
        <a href="#${type}" class="${className}" sort-type="${type}">Sort by ${type}</a>
      </li>`
    );
  }).join(``);

  return (
    `<ul class="sort">
       ${sortItems}
     </ul>`
  );
};

export default class Sorter extends AbstractComponent {
  constructor() {
    super();
    this._activeSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return getSorterTemplate();
  }

  get sortType() {
    return this._activeSortType;
  }

  set sortType(sortType) {
    this._activeSortType = sortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const target = evt.target;
      if (target.tagName === `A` && !target.classList.contains(`.${LINK_ACTIVE_CLASS_NAME}`)) {
        this.getElement().querySelector(`.${LINK_ACTIVE_CLASS_NAME}`).classList.remove(LINK_ACTIVE_CLASS_NAME);
        target.classList.add(LINK_ACTIVE_CLASS_NAME);
        handler(target.getAttribute(`sort-type`));
      }
    });
  }
}
