const render = (html, target, where = `beforeend`) => target.insertAdjacentHTML(where, html);

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const getRandomNumber = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

const getRandomChoice = (array, length) => (length) ? shuffle(array).slice(0, length) : array[getRandomNumber(0, array.length - 1)];

export {render, shuffle, getRandomNumber, getRandomChoice};
