import { displayEntireArticleFaz, fazRegex } from "./SpecificCleanup/Pages/faz.js";
import {get_readability_article} from "./cleanup.js";

export async function Article(url) {
    //if a paginated article on faz:
    if(url.match(fazRegex)){
        url = displayEntireArticleFaz(url)
    }

    let article = await get_readability_article(url)

    return article;
}