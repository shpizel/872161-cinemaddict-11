import {replaceNew} from "../utils/render";
import AbstractComponent from "./abstract-component";

export default class SmartAbstractComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    this.removeElement();
    const newElement = this.getElement();
    replaceNew(document.body, newElement, oldElement);
    this.recoveryListeners();
  }
}
