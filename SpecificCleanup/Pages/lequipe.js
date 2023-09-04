import { removeAllElementsIfExistent } from "../util.js";

export const leqiupeRegex = /(http|https):\/\/(www.lequipe.fr).*/;

export function cleanLequipeBefore(documentClone) {
  removeAllElementsIfExistent(".Author__infos", documentClone)
  return documentClone;
}
