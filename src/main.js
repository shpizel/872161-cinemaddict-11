import {getRandomChoice, getRandomNumber, removeNode, render} from './components/utils';
import {getHeaderHTML} from './components/header';
import {
  getMainFilmsSectionLoadingMsgHTML,
  getMainHTML,
  getMainFilmsSectionEmptyMsgHTML,
  getMainFilmsSectionFilmsContainerHTML,
  getMainFilmsSectionExtraFilmsContainerHTML,
  getFilmCardHTML
} from './components/main';
import {getFooterHTML} from './components/footer';
import {getFilmDetailsPopupHTML} from './components/popup';
import {getRandomProfile} from "./mocks/profile";
import {sorterItems} from "./mocks/sorter";
import {mainMenuItems} from "./mocks/mainmenu";
import {getRandomFilm} from "./mocks/film";

const FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;

const headerNode = document.querySelector(`header`);
render(getHeaderHTML(getRandomProfile()), headerNode);

const mainNode = document.querySelector(`main`);
render(getMainHTML(mainMenuItems, sorterItems), mainNode);

const filmsNode = document.querySelector(`.films`);
const filmsListNode = document.querySelector(`.films-list`);
render(getMainFilmsSectionLoadingMsgHTML(), filmsListNode);

const footerNode = document.querySelector(`footer`);
render(getFooterHTML(), footerNode);

setTimeout(() => {
  filmsListNode.innerHTML = ``;
  const isEmpty = getRandomNumber(0, 5) === 0;
  let films = isEmpty ? [] : new Array(getRandomNumber(15, 20)).fill(0).map(getRandomFilm);
  if (films.length > 0) {
    render(getMainFilmsSectionFilmsContainerHTML(), filmsListNode);
    const filmsListContainerNode = document.querySelector(`.films-list .films-list__container`);
    const showMoreButtonNode = document.querySelector(`.films-list__show-more`);
    for (let i = 0; i < FILMS_COUNT; i++) {
      const randomFilm = getRandomChoice(films);
      if (!randomFilm) {
        removeNode(showMoreButtonNode);
        continue;
      }
      films = films.filter((film) => film !== randomFilm);
      render(getFilmCardHTML(randomFilm), filmsListContainerNode);
    }
    showMoreButtonNode.addEventListener(`click`, () => {
      for (let i = 0; i < FILMS_COUNT; i++) {
        const randomFilm = getRandomChoice(films);
        if (!randomFilm) {
          removeNode(showMoreButtonNode);
          break;
        }
        films = films.filter((film) => film !== randomFilm);
        render(getFilmCardHTML(randomFilm), filmsListContainerNode);
      }
    });

    render(getMainFilmsSectionExtraFilmsContainerHTML(), filmsNode);
    const topRatedNode = document.querySelectorAll(`.films-list--extra .films-list__container`)[0];
    for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
      render(getFilmCardHTML(getRandomFilm()), topRatedNode);
    }

    const mostCommentedNode = document.querySelectorAll(`.films-list--extra .films-list__container`)[1];
    for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
      render(getFilmCardHTML(getRandomFilm()), mostCommentedNode);
    }

    const showPopup = getRandomNumber(0, 1) === 0;
    if (showPopup) {
      render(getFilmDetailsPopupHTML(getRandomFilm()), footerNode, `afterend`);
    }
  } else {
    render(getMainFilmsSectionEmptyMsgHTML(), filmsListNode);
  }
}, getRandomNumber(250, 750));
