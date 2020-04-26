const getHeaderLogoHTML = () => `<h1 class="header__logo logo">Cinemaddict</h1>`;

const getHeaderProfileHTML = (profile) => `<section class="header__profile profile">
  <p class="profile__rating">${profile.grade}</p>
  <img class="profile__avatar" src="${profile.avatar}" alt="Avatar" width="35" height="35">
</section>`;

export const getHeaderHTML = (profile) => `${getHeaderLogoHTML()}\n${getHeaderProfileHTML(profile)}`;
