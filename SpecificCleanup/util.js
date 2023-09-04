import {JSDOM} from "jsdom";

export function removeFirstElementIfExistent(element, div) {
  let elem = div.querySelector(element);
  if (elem) {
    elem.remove();
  }
}

export function removeAllElementsIfExistent(element, div) {
  let elements = div.querySelectorAll(element);
  if (elements) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].remove();
    }
}}

export function removeAllElementsWithText(element, text, div) {
  let elems = div.querySelectorAll(element);
  Array.from(elems).filter((elem) =>
    elem.textContent.includes(text) ? elem.remove() : elem
  );
}

export function addCommas(element, div) {
  const elements = div.querySelectorAll(element);
  if (elements) {
    for (let i = 0; i < elements.length; i++) {
      if (i != elements.length - 1) {
        elements[i].innerHTML += ", ";
      }
    }
  }
}

export function changeTagToParagraph(element, div) {
  let currentElement = div.querySelector(element);
  if (currentElement) {
    let newElement = div.createElement("p");
    newElement.innerHTML = currentElement.innerHTML;
    currentElement.parentNode.replaceChild(newElement, currentElement);
  }
}

export function createDivWithContent(content){
  const { window } = new JSDOM("");
  const document = window.document;

  const div = document.createElement("div");
  div.innerHTML = content
  return div
}



export function deleteTimeouts() {
  var id = window.setTimeout(function () {}, 0);
  while (id--) {
    window.clearTimeout(id);
  }
}

export function deleteIntervals() {
  var id = window.setInterval(function () {}, 0);
  while (id--) {
    window.clearInterval(id);
  }
}



export async function getSourceAsDOM(url) {
  const response = await fetch(url);
  const html = await response.text();

  // const parser = new DOMParser();
  //const clean = DOMPurify.sanitize(html);
  const dom = new JSDOM(html);
  return dom.window.document;

  // return parser.parseFromString(html, "text/html");
}

export async function getHTMLContent(url) {
  axios.get('url').then(function (response) {
    console.log(response);
    return response;
  }).catch(function (error) {
    console.log(error);
  });
}

export function getEmptyDocument() {
  const {window} = new JSDOM("");
  const document = window.document;
  return document;
}

export function createEmptyDiv() {
  const { window } = new JSDOM("");
  const document = window.document;
  const div = document.createElement("div");
  return div;
}