import AbstractComponent from "./abstract-component.js";

const getFooterStatsTemplate = (moviesCount) => {
  return (
    `<section class="footer__statistics">
       <p>${moviesCount} movies inside</p>
     </section>`
  );
};

export default class FooterStats extends AbstractComponent {
  constructor(moviesCount) {
    super();
    this._moviesCount = moviesCount;
  }

  getTemplate() {
    return getFooterStatsTemplate(this._moviesCount);
  }
}
