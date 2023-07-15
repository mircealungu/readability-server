import express from "express";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

const app = express();

// Define a single endpoint
app.get("/cleanup", async (req, res) => {
  const { url } = req.query;

  // Fetch the HTML content of the provided URL
  const response = await fetch(url);
  const html = await response.text();

  // Create a DOM from the HTML
  const { window } = new JSDOM(html);
  const doc = window.document;

  // Use Readability to extract the article content
  const reader = new Readability(doc);
  const article = reader.parse();

  // Send the cleaned up content as the response
  res.send(article.content);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
