const express = require("express");
const { book, bookCategory } = require("../controllers/library.controller");
const idValidation = require("../middlewares/idValidation");
const bookRouter = express.Router();

bookRouter.route("/categories").get(bookCategory.list).post(bookCategory.create);

bookRouter
  .route("/categories/:categoryId")
  .all(idValidation)
  .get(bookCategory.read)
  .put(bookCategory.update)
  .patch(bookCategory.update)
  .delete(bookCategory.delete);

bookRouter.route("/").get(book.list).post(book.create);

bookRouter
  .route("/:id")
  .all(idValidation)
  .get(book.read)
  .put(book.update)
  .patch(book.update)
  .delete(book.delete);

module.exports = bookRouter;
