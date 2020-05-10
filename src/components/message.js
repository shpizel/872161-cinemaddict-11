import AbstractComponent from "./abstract-component.js";

const getMessageTemplate = (message) => {
  return (
    `<h2 class="films-list__title">${message}</h2>`
  );
};

export default class Message extends AbstractComponent {
  constructor(message) {
    super();
    this._message = message;
  }
  getTemplate() {
    return getMessageTemplate(this._message);
  }
}
