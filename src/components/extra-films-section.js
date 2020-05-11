import AbstractComponent from "./abstract-component.js";

const EXTRA_FILMS_CONTAINER_CLASSNAME = `films-list__container`;

const getMoviesSectionTemplate = (title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="${EXTRA_FILMS_CONTAINER_CLASSNAME}"></div>
    </section>`
  );
};

export default class ExtraFilmsSection extends AbstractComponent {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return getMoviesSectionTemplate(this._title);
  }

  getContainer() {
    return this.getElement().querySelector(`.${EXTRA_FILMS_CONTAINER_CLASSNAME}`);
  }
}
