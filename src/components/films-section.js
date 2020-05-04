import AbstractComponent from "./abstract-component.js";

const getFilmsTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class FilmsSection extends AbstractComponent {
  getTemplate() {
    return getFilmsTemplate();
  }
}
