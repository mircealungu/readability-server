import {text2DOM} from "./util.js";

export function HTML2Text(html) {

    let result = "";

    const document = text2DOM(html);

    const paragraphs = [... document.getElementsByTagName('p')];

    for (let i in paragraphs) {
        result += paragraphs[i].textContent;
        result += "\n\n";
    }
    return result
}