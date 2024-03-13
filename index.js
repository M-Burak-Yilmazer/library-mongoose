"use strict";

const express = require("express");
const app = express();
app.use(express.json());
require("express-async-errors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
require("./src/starter/dbConnection");

app.all("/", (req, res) => res.send("<h1>Welcome to INDEX PAGE</h1>"));

app.use(require("./src/errors/errorHandler.js"));
app.listen(PORT, () =>
  console.log(`your database is live on : http://127.0.0.1:${PORT}`)
);
