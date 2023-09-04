import {createDivWithContent, getEmptyDocument, getSourceAsDOM} from "../util.js";
import {egyszervoltRegex} from "./Pages/egyszervolt.js";
import {JSDOM} from "jsdom";

export async function getMainImage(HTMLContent, url) {
    const currentDOM = await getSourceAsDOM(url);

    let articleImage;
    let socialMediaImage = currentDOM.querySelector('meta[property="og:image"]');

    if (socialMediaImage) {
        articleImage = socialMediaImage.content;
    }

    let articleIllustration = currentDOM.querySelector('.article__illustration>picture>img');
    if (articleIllustration) {
        articleImage = articleIllustration.src;
    }


    if (articleImage === undefined) {
        const HTMLDiv = createDivWithContent(HTMLContent);
        const images = HTMLDiv.querySelectorAll("img");
        if (images) {
            for (var i = 0; i < images.length; i++) {
                const imgScr = images[i].currentSrc
                const imgAlt = images[i].getAttribute("alt")
                const correctFormat = correctImageFormat(imgScr);
                const websiteIcon = imgScr.includes("cover") || imgScr.includes("placeholder") || imgScr.includes("icon");

                if (images[i].height > 350 && images[i].className.includes("lazy") && !websiteIcon) {
                    let image = images[i].dataset.original;
                    if (image === undefined) {
                        image = images[i].dataset.src;
                    }
                    articleImage = createImage(imgAlt, image);
                    return articleImage;
                } else if (images[i].height > 250 && correctFormat && !websiteIcon) {
                    articleImage = createImage(imgAlt, imgScr);
                    return articleImage;
                }
                if (url.match(egyszervoltRegex) && images[i].height > 150) {
                    articleImage = createImage(imgAlt, imgScr);
                    return articleImage;
                }
            }
        }
    } else {
        articleImage = createImage(null, articleImage);
        return articleImage;
    }
}

function createImage(alt, src) {
    const document = getEmptyDocument();
    const newImage = document.createElement("img");
    newImage.setAttribute("src", src);
    newImage.setAttribute("alt", alt);
    newImage.setAttribute("topImage", "true");
    return newImage;
}

function correctImageFormat(imgScr) {
    var lastThreeChar = imgScr.slice(-3);
    if (lastThreeChar === "gif" || lastThreeChar === "svg") {
        return false;
    }
    return true;
}