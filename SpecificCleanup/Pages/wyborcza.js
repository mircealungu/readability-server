import { createDivWithContent, removeAllElementsIfExistent } from "../../util.js";

export const wyborczaRegex = /(http|https):\/\/(wyborcza.pl).*/;

export function cleanWyborcza(readabilityContent) {
  const div = createDivWithContent(readabilityContent)
  removeAllElementsIfExistent("[id^=mcBan]", div)
  return div.innerHTML;
}
