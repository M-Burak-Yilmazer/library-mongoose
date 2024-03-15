"use strict";

const express = require("express");
const app = express();
app.use(express.json());
require("express-async-errors");
require("dotenv").config();
const cors = require("cors");
app.use(
  cors({
    origin: "https://library-frontend-sigma.vercel.app",
  })
);

const PORT = process.env.PORT || 8080;
require("./src/starter/dbConnection");

const session = require("cookie-session");
app.use(
  session({
    secret: process.env.SECRET_KEY,
    //  maxAge:1000*60*60*24*3
  })
);
// app.use(require("./src/middlewares/user.check.js"));

app.use(require("./src/middlewares/findSearchSortPage"));

app.all("/", (req, res) => {
  if (req.isLogin) {
    res.send({
      error: false,
      message: "login ok",
      session: req.session,
      user: req.user,
      //* anasayfada da burda görünüyor mu görebilirim
    });
  } else {
    res.send({
      error: false,
      message: "login ok",
      session: req.session,
    });
  }
});

app.use(require("./src/routes/user.router.js"));
app.use(require("./src/routes/library.route.js"));
app.use(require("./src/errors/errorHandler.js"));
app.listen(PORT, () =>
  console.log(`your database is live on : http://127.0.0.1:${PORT}`)
);

// require("./src/sync.js")();
