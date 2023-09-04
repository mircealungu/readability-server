import {JSDOM} from "jsdom";
import {Readability} from "@mozilla/readability";

export async function basic_readability_cleanup(url) {

    return (await get_readability_article(url)).content
}


export async function get_readability_article(url) {

    // Fetch the HTML content of the provided URL
    const response = await fetch(url);
    const html = await response.text();

    // Create a DOM from the HTML
    const { window } = new JSDOM(html);
    const doc = window.document;

    // Use Readability to extract the article content
    const reader = new Readability(doc);
    const article = reader.parse();

    return article;
}