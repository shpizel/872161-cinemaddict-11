import AbstractComponent from "./abstract-component.js";

export const MessageType = {
  LOADING: `Loading...`,
  NO_MOVIES: `There are no movies in our database`,
};

const getMessageTemplate = (message, additionalClasses = []) => {
  return (
    `<h2 class="films-list__title${(additionalClasses.length > 0) ? ` ${additionalClasses.join(` `)}` : ``}">${message}</h2>`
  );
};

export default class Message extends AbstractComponent {
  constructor(message, additionalClasses = []) {
    super();
    this._message = message;
    this._additionalClasses = additionalClasses;
  }
  getTemplate() {
    return getMessageTemplate(this._message, this._additionalClasses);
  }
}
