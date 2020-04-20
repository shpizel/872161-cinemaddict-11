const getFooterLogoHTML = () => `<section class="footer__logo logo logo--smaller">Cinemaddict</section>`;

const getFooterStatisticsHTML = () => `<section class="footer__statistics">
  <p>130 291 movies inside</p>
</section>`;

const getFooterHTML = () => `${getFooterLogoHTML()}\n${getFooterStatisticsHTML()}`;

export {getFooterHTML};
