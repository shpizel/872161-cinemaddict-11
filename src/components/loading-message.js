import AbstractComponent from "./abstract-component.js";

const getLoadingMessageTemplate = () => {
  return (
    `<h2 class="films-list__title">Loading...</h2>`
  );
};

export default class LoadingMessage extends AbstractComponent {
  getTemplate() {
    return getLoadingMessageTemplate();
  }
}
