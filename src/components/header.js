const getHeaderLogoHTML = () => `<h1 class="header__logo logo">Cinemaddict</h1>`;

const getHeaderProfileHTML = () => `<section class="header__profile profile">
  <p class="profile__rating">Movie Buff</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;

const getHeaderHTML = () => `${getHeaderLogoHTML()}\n${getHeaderProfileHTML()}`;

export {getHeaderHTML};
