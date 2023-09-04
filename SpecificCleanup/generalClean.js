import {createEmptyDiv, removeAllElementsIfExistent} from "./util.js";


/*Final cleanup function */
export function generalClean(readabilityContent) {
  let cleanContent = removeSVG(readabilityContent);
  cleanContent = removeLinks(cleanContent);
  cleanContent = removeFigures(cleanContent);

  return cleanContent;
}

/* Helper Functions */
function removeSVG(readabilityContent) {
  const div = createEmptyDiv();
  div.innerHTML = readabilityContent;
  removeAllElementsIfExistent("svg", div)
  return div.innerHTML;
}

function removeLinks(readabilityContent) {
  const div = createEmptyDiv();
  div.innerHTML = readabilityContent;

  var links = div.getElementsByTagName("a");
  while (links.length) {
    var parent = links[0].parentNode;
    while (links[0].firstChild) {
      parent.insertBefore(links[0].firstChild, links[0]);
    }
    parent.removeChild(links[0]);
  }
  return div.innerHTML;
}

function removeFigures(readabilityContent) {

  const div = createEmptyDiv();
  div.innerHTML = readabilityContent;
  removeAllElementsIfExistent("figure", div)
  // removeAllElementsIfExistent("img", div)

  return div.innerHTML;
}