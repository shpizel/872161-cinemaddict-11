import AbstractComponent from "./abstract-component.js";

const FILMS_CONTAINER_CLASSNAME = `films-list__container`;

const getMoviesSectionTemplate = () => {
  return (
    `<section class="films-list">
       <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
       <div class="${FILMS_CONTAINER_CLASSNAME} visually-hidden"></div>
     </section>`
  );
};

export default class PrimaryFilmsSection extends AbstractComponent {
  getTemplate() {
    return getMoviesSectionTemplate();
  }

  getContainer() {
    return this.getElement().querySelector(`.${FILMS_CONTAINER_CLASSNAME}`);
  }
}
