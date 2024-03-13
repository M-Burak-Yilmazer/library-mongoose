"use strict";

const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    ISBN: {
      type: Number,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    publicationYear: {
      type: Date,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    collection: "book",
    timestamp: true,
  }
);

const Book = mongoose.model("Book", librarySchema);
module.exports = { Book };
