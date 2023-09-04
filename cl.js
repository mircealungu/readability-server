import {Article}  from "./Article.js";
import {individualClean, cleanAfterArray, cleanBeforeArray} from "./SpecificCleanup/pageSpecificClean.js";
import {generalClean} from "./SpecificCleanup/generalClean.js";
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import {HTML2Text} from "./convert_htm_to_plaintext.js";



let url = "https://www.huffingtonpost.fr/culture/article/philippe-garrel-accuse-par-plusieurs-actrices-dont-clotilde-hesme-et-anna-mouglalis-de-comportements-inappropries_222416.html";
url = "https://www.lexpress.fr/sciences-sante/sante/asthme-chez-les-enfants-pourquoi-y-a-t-il-un-pic-a-chaque-rentree-scolaire-3DJHGJGIVVA55OWEKS5GSDFBYY/";
// url ="https://www.lexpress.fr/economie/emploi/droit-travail/les-francais-et-le-travail-une-schizophrenie-nationale-VNDFDPXLQFGLJEXRH2ODMAU7DU/";
url = "https://www.lemonde.fr/disparitions/article/2023/09/02/l-homme-d-affaires-egyptien-mohammed-al-fayed-ancien-proprietaire-d-harrods-est-mort_6187473_3382.html";
url = "https://www.marianne.net/politique/gauche/qui-a-abandonne-qui-abaya-presidentielle-2002-quand-lionel-jospin-reecrit-un-peu-lhistoire#utm_source=RSS-MARIANNE&utm_medium=Flux-Rss&utm_campaign=RSS_general";


let article = await Article(url)

// this one breaks it... so we run w/o cleanBefore for now
// let cleanedContent = individualClean(article.content, url, cleanBeforeArray);
// console.log(cleanedContent);

let cleanedContent = generalClean(article.content);

cleanedContent = individualClean(cleanedContent, url, cleanAfterArray);


const window = new JSDOM('').window;
const purify = DOMPurify(window);
cleanedContent = purify.sanitize(cleanedContent);
// console.log(cleanedContent);

console.log(HTML2Text(cleanedContent))

// console.log(cleanedContent);
// console.log(await getMainImage(article.content, url));
