const express = require("express");
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { createHandler } = require("graphql-http/lib/use/express");
const schema = require('./graphql/schema');
const { ruruHTML } = require("ruru/server");

dotenv.config();
const port = process.env.PORT;

const app = express();

connectDB();

app.all(
  "/graphql",
  createHandler({
    schema: schema
  })
);

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
});

// Start the server at port
app.listen(port, console.log(`Server is running on http://localhost:${port}`));