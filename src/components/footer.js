import {getRandomNumber} from "./utils";

const getFooterLogoHTML = () => `<section class="footer__logo logo logo--smaller">Cinemaddict</section>`;

const getFooterStatisticsHTML = (moviesCount = getRandomNumber(1, 100)) => `<section class="footer__statistics">
  <p>${moviesCount} movies inside</p>
</section>`;

export const getFooterHTML = () => `${getFooterLogoHTML()}\n${getFooterStatisticsHTML()}`;
