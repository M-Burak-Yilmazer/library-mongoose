"use strict";

const { CustomError } = require("../errors/customError");
const { Book, BookCategory } = require("../models/library.model");
const mongoose = require("mongoose");

const bookCategory = {
  list: async (req, res) => {
    const data = await BookCategory.find({});
    res.status(200).send({
      isError: false,
      body: data,
    });
  },
  create: async (req, res) => {
    const data = await BookCategory.create(req.body);
    res.status(201).send({
      isError: false,
      body: data,
    });
  },
  read: async (req, res) => {
    // const idIsValid = mongoose.Types.ObjectId.isValid(req.params.id);
    // if (!idIsValid) throw new CustomError("id is not valid Id", 400);

    const data = await BookCategory.findOne({ _id: req.params.categoryId });
    res.status(200).send({ isError: false, body: data });
  },
  update: async (req, res) => {
    // const idIsValid = mongoose.Types.ObjectId.isValid(req.params.id);
    // if (!idIsValid) throw new CustomError("id is not valid Id", 400);

    const data = await BookCategory.updateOne(
      { _id: req.params.categoryId },
      req.body,
      {
        runValidators: true,
      }
    );
    const updated = await BookCategory.findOne({ _id: req.params.categoryId });
    res.status(202).send({ isError: false, body: updated, data });
  },
  delete: async (req, res) => {
    // const idIsValid = mongoose.Types.ObjectId.isValid(req.params.id);
    // if (!idIsValid) throw new CustomError("id is not valid Id", 400);
    const data = await BookCategory.deleteOne({ _id: req.params.categoryId });
    if (!data.deletedCount) throw new CustomError("not deleted", 409);
    res.status(204).send({
      isError: false,
      body: data,
    });
  },
};

const book = {
  list: async (req, res) => {
    /* FILTERING & SEARCHING & SORTING & PAGINATION */
    //! Filter
    const filter = req.query?.filter || {};
    // console.log(filter);

    //? Searching
    const search = req.query?.search || {};
    console.log(search);
    for (let key in search) {
      search[key] = {
        $regex: search[key],
        $options: "i",
      }; //! i : büyük kğçük harf duyarsız
      
    }
    // console.log(search)

    ///?*Sorting

    const sort = req.query?.sort || {};
    console.log(sort);

    /* FILTERING & SEARCHING & SORTING & PAGINATION */

    const data = await Book.find({ ...filter, ...search }).sort(sort);

    res.status(200).send({
      isError: false,
      body: data,
    });
  },
  create: async (req, res) => {
    const data = await Book.create(req.body);
    res.status(201).send({
      isError: false,
      body: data,
    });
  },
  read: async (req, res) => {
    // const idIsValid = mongoose.Types.ObjectId.isValid(req.params.id);
    // if (!idIsValid) throw new CustomError("id is not valid Id", 400);

    const data = await Book.findOne({ _id: req.params.id });
    res.status(200).send({ isError: false, body: data });
  },
  update: async (req, res) => {
    // const idIsValid = mongoose.Types.ObjectId.isValid(req.params.id);
    // if (!idIsValid) throw new CustomError("id is not valid Id", 400);

    const data = await Book.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    const updated = await Book.findOne({ _id: req.params.id });
    res.status(202).send({ isError: false, body: updated, data });
  },
  delete: async (req, res) => {
    // const idIsValid = mongoose.Types.ObjectId.isValid(req.params.id);
    // if (!idIsValid) throw new CustomError("id is not valid Id", 400);
    const data = await Book.deleteOne({ _id: req.params.id });
    if (!data.deletedCount) throw new CustomError("not deleted", 409);
    res.status(204).send({
      isError: false,
      body: data,
    });
  },
};
module.exports = { book, bookCategory };
