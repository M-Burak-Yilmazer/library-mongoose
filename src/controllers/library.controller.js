"use strict";

const { CustomError } = require("../errors/customError");
const { Book } = require("../models/library.model");
const mongoose = require("mongoose");

const book = {
  list: async (req, res) => {
    const data = await Book.find({});
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
    const idIsValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!idIsValid) throw new CustomError("id is not valid Id", 400);

    const data = await Book.findOne({ _id: req.params.id });
    res.status(200).send({ isError: false, body: data });
  },
  update: async (req, res) => {
    const idIsValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!idIsValid) throw new CustomError("id is not valid Id", 400);

    const data = await Book.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    res.status().send({});
  },
  delete: async (req, res) => {
    res.status().send({});
  },
};
