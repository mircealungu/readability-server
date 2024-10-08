import { removeAllElementsIfExistent } from "../../util.js";

export const nuRegex = /^(http|https):\/\/(www.)nu.nl\/.*/;

export function cleanNuBefore(documentClone){
  return removeBlockTitle(documentClone)
}

function removeBlockTitle(documentClone) {
  removeAllElementsIfExistent(".block-title", documentClone)
  return documentClone;
}
