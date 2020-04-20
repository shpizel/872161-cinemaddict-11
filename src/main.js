import {render} from './components/utils';
import {getHeaderHTML} from './components/header';
import {getMainHTML} from './components/main';
import {getFooterHTML} from './components/footer';
import {getFilmDetailsPopupHTML} from './components/popup';

const headerNode = document.querySelector(`header`);
render(getHeaderHTML(), headerNode);

const mainNode = document.querySelector(`main`);
render(getMainHTML(), mainNode);

const footerNode = document.querySelector(`footer`);
render(getFooterHTML(), footerNode);

setTimeout(() => render(getFilmDetailsPopupHTML(), footerNode, `afterend`), 5000);

