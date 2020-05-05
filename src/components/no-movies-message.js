import AbstractComponent from "./abstract-component.js";

const getNoMoviesMessageTemplate = () => {
  return (
    `<h2 class="films-list__title">There are no movies in our database</h2>`
  );
};

export default class NoMoviesMessage extends AbstractComponent {
  getTemplate() {
    return getNoMoviesMessageTemplate();
  }
}
