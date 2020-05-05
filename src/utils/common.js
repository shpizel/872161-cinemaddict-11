export const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const getRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

export const getRandomChoice = (array, length) => {
  return (length) ? shuffle(array).slice(0, length) : array[getRandomNumber(0, array.length - 1)];
};

export const removeNode = (element) => {
  if (element && element.parentNode && element.parentNode.removeChild) {
    element.parentNode.removeChild(element);
  }
  throw new Error(`Deprecated`);
};

export const capitalize = (s) => {
  if (typeof s !== `string`) {
    return ``;
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
};

