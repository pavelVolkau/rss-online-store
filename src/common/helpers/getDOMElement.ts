// Если нужно пропустить аргумент, на его место необходимо вписать undefined!

export default function getDOMElement(
  tagName: string,
  classList: string | string[],
  text?: string,
  id?: string,
  atributes?: {
    [key: string]: string;
  },
): HTMLElement {
  const element = document.createElement(tagName);

  if (typeof classList === 'string') {
    element.className = classList;
  } else {
    element.classList.add(...classList);
  }

  if (text) {
    element.innerText = text;
  }

  if (id) {
    element.id = id;
  }

  if (atributes) {
    Object.keys(atributes).forEach((key) => {
      element.setAttribute(key, atributes[key]);
    });
  }

  return element;
}
