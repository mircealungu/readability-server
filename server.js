import express from "express";
import { advanced_readability_cleanup } from "./cleanup.js";
import { HTML2Text } from "./convert_htm_to_plaintext.js";
import * as packageJson from "./package.json" assert { type: "json" };
import * as Sentry from "@sentry/node";

const app = express();

// Sentry prefix: START
Sentry.init({
  dsn: "https://754bd6621282bfc97d64d3dc12fba591@o176103.ingest.us.sentry.io/4506971631517696",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
  ],
  // Performance Monitoring
  tracesSampleRate: 0.1, //  Capture 10% of the transactions
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());
// Sentry prefix: END

app.get("/cleanup", async (req, res) => {
  const { url } = req.query;
  console.log(req.query);

  try {
    const html = await advanced_readability_cleanup(url);
    // Send the cleaned up content as the response
    res.send({ html: html, text: HTML2Text(html) });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.get("/ping", async (req, res) => {
  res.send("pong");
});

// ----> Sentry Appendix: START
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

// ----> Sentry Appendix: END

// Start the server
const port = 3456;
app.listen(port, () => {
  console.log(
    `Server (${packageJson.default.version}) is running on http://localhost:${port}`,
  );
});
