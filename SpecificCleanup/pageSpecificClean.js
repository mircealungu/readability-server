import {btRegex, cleanBT} from "./Pages/bt.js";
import {cleanWiki, wikiRegex} from "./Pages/wiki.js";
import {cleanEkstraBladet, cleanEkstraBladetBefore, ekstrabladetRegex} from "./Pages/ekstrabladet.js";
import {cleanLemonde, cleanLemondeBefore, lemondeRegex} from "./Pages/lemonde.js";
import {cleanDRBefore, drRegex} from "./Pages/dr.js";
import {cleanLexpress, cleanLexpressBefore, lexpressRegex} from "./Pages/lexpress.js";
import {cleanMarianne, cleanMarianneBefore, marianneRegex} from "./Pages/marianne.js";
import {cleanIngenioeren, ingenioerRegex} from "./Pages/ingenioeren.js";
import {cleanNuBefore, nuRegex} from "./Pages/nu.js";
import {cleanLequipeBefore, leqiupeRegex} from "./Pages/lequipe.js";
import {berlingskeRegex, cleanBerlingske, cleanBerlingskeBefore} from "./Pages/berlingske.js";
import {cleanSpiegelBefore, spiegelRegex} from "./Pages/spiegel.js";
import {bbcRegex, cleanBBC} from "./Pages/bbc.js";
import {cleanExpressBefore, expressRegex} from "./Pages/express.js";
import {cleanWyborcza, wyborczaRegex} from "./Pages/wyborcza.js";
import {cleanRzecz, cleanRzeczBefore, rzeczRegex} from "./Pages/rzecz.js";
import {cleanFaktBefore, faktRegex, removeFaktIFrames} from "./Pages/fakt.js";
import {cleanPolitiken, cleanPolitikenBefore, politikenRegex} from "./Pages/politiken.js";
import {cleanScientias, scientiasRegex} from "./Pages/scientias.js";
import {cleanEgyszervolt, egyszervoltRegex} from "./Pages/egyszervolt.js";
import {corriereRegex, removeCorriereScripts} from "./Pages/corriere.js";
import {deleteIntervals, deleteTimeouts} from "./util.js";



//Arrays with url regex and associated cleaning function, that has to be applied to 
//the page

export const cleanBeforeArray = [
  { regex: drRegex, function: cleanDRBefore },
  { regex: lemondeRegex, function: cleanLemondeBefore },
  { regex: nuRegex, function: cleanNuBefore },
  { regex: ekstrabladetRegex, function: cleanEkstraBladetBefore },
  { regex: leqiupeRegex, function: cleanLequipeBefore },
  { regex: berlingskeRegex, function: cleanBerlingskeBefore },
  { regex: spiegelRegex, function: cleanSpiegelBefore },
  { regex: expressRegex, function: cleanExpressBefore },
  { regex: faktRegex, function: cleanFaktBefore },
  { regex: rzeczRegex, function: cleanRzeczBefore },
  { regex: lexpressRegex, function: cleanLexpressBefore },
  { regex: marianneRegex, function: cleanMarianneBefore },
  { regex: politikenRegex, function: cleanPolitikenBefore }
];

export const cleanAfterArray = [
  { regex: wikiRegex, function: cleanWiki },
  { regex: btRegex, function: cleanBT },
  { regex: ekstrabladetRegex, function: cleanEkstraBladet },
  { regex: lemondeRegex, function: cleanLemonde },
  { regex: lexpressRegex, function: cleanLexpress },
  { regex: marianneRegex, function: cleanMarianne },
  { regex: ingenioerRegex, function: cleanIngenioeren },
  { regex: berlingskeRegex, function: cleanBerlingske },
  { regex: bbcRegex, function: cleanBBC },
  { regex: wyborczaRegex, function: cleanWyborcza },
  { regex: rzeczRegex, function: cleanRzecz },
  { regex: politikenRegex, function: cleanPolitiken },
  { regex: scientiasRegex, function: cleanScientias },
  { regex: egyszervoltRegex, function: cleanEgyszervolt }
]

export function cleanTimeoutsAndIntervals(url) {
  deleteIntervals();
  deleteTimeouts();

  if (url.match(faktRegex)) {
    setTimeout(function () {
      removeFaktIFrames();
    }, 10000);
  }
  if (url.match(corriereRegex)) {
    setTimeout(function () {
      removeCorriereScripts();
    }, 10000);
  }
}

export function individualClean(content, url, cleaningArray) {
  for (let i = 0; i < cleaningArray.length; i++) {
    const regx = cleaningArray[i].regex;
    const cleaningFunction = cleaningArray[i].function;
    if (url.match(regx)) {
      return cleaningFunction(content, url)
    }
  }
  return content
}
