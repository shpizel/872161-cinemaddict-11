import Sorter from "../components/sorter";
import {render} from "../utils/render";

export default class SorterController {
  constructor(container) {
    this._container = container;
    this._sorter = new Sorter();
    this.prepareHandlers();
  }

  prepareHandlers() {
    this._sorter.setSortTypeChangeHandler((sortType) => sortType);
  }

  render() {
    render(this._container, this._sorter);
  }
}
