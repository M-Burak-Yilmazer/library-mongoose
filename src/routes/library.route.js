const express = require("express");
const { book } = require("../controllers/library.controller");
const idValidation = require("../middlewares/idValidation");
const bookRouter = express.Router();

bookRouter.route("/").get(book.list).post(book.create);

bookRouter
  .route("/:id")
  .all(idValidation)
  .get(book.read)
  .put(book.update)
  .patch(book.update)
  .delete(book.delete);

module.exports = bookRouter;
