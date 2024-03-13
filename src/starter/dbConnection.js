"use strict";

const mongoose = require("mongoose");
const { CustomError } = require("../errors/customError");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log("DB is not connected", err);
    throw new CustomError("db connection is failed");
  });
