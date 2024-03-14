"use strict";

const mongoose = require("mongoose");
const bookCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      
    },
  },
  { collection: "bookCategory", timestamps: true }
);

const librarySchema = new mongoose.Schema(
  {
    bookCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookCategory",
      required: true,
    },

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
librarySchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const Book = mongoose.model("Book", librarySchema);
const BookCategory = mongoose.model("BookCategory", bookCategorySchema);
module.exports = { Book, BookCategory };
