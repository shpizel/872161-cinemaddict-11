import AbstractComponent from "./abstract-component.js";

const getMoviesSectionTemplate = () => {
  return (
    `<section class="films-list">
       <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
       <div class="films-list__container"></div>
     </section>`
  );
};

export default class PrimaryFilmsSection extends AbstractComponent {
  getTemplate() {
    return getMoviesSectionTemplate();
  }

  getContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
