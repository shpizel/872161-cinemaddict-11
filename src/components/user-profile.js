import AbstractComponent from "./abstract-component";

const getUserProfileTemplate = (profile) => {
  const {grade, avatar} = profile;
  return (
    `<section class="header__profile profile">
       <p class="profile__rating">${grade}</p>
       <img class="profile__avatar" src="${avatar}" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserProfile extends AbstractComponent {
  constructor(profile) {
    super();
    this._profile = profile;
  }

  getTemplate() {
    return getUserProfileTemplate(this._profile);
  }
}
