import express from "express";
import {basic_readability_cleanup} from "./cleanup.js";

const app = express();


// Define a single endpoint
app.get("/cleanup", async (req, res) => {
  const { url } = req.query;

  const start = process.hrtime();

  const content = basic_readability_cleanup(url);

  // Send the cleaned up content as the response
  res.send(content);

  // Calculate the execution time
  const end = process.hrtime(start);
  const executionTime = `${end[0]}s ${end[1] / 1000000}ms`;

  console.log(`Request for ${url} took ${executionTime}`);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
