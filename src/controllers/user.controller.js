require("express-async-errors");

const User = require("../models/user.model");

module.exports = {
  list: async (req, res) => {
    const data = await User.find({});
    res.status(200).send({
      isError: false,
      body: data,
    });
  },
  create: async (req, res) => {
    const data = await User.create(req.body);
    res.status(201).send({
      isError: false,
      body: data,
    });
  },
  read: async (req, res) => {
    // const idIsValid = mongoose.Types.ObjectId.isValid(req.params.userId);
    // if (!idIsValid) throw new CustomError("userId is not valid Id", 400);

    const data = await User.findOne({ _id: req.params.userId });
    res.status(200).send({ isError: false, body: data });
  },
  update: async (req, res) => {
    // const idIsValid = mongoose.Types.ObjectId.isValid(req.params.userId);
    // if (!idIsValid) throw new CustomError("userId is not valid Id", 400);

    const data = await User.updateOne({ _id: req.params.userId }, req.body, {
      runValidators: true,
    });
    const updated = await User.findOne({ _id: req.params.userId });
    res.status(202).send({ isError: false, body: updated, data });
  },
  delete: async (req, res) => {
    // const idIsValid = mongoose.Types.ObjectId.isValid(req.params.userId);
    // if (!idIsValid) throw new CustomError("userId is not valid Id", 400);
    const data = await User.deleteOne({ _id: req.params.userId });
    if (!data.deletedCount) throw new CustomError("not deleted", 409);
    res.status(204).send({
      isError: false,
      body: data,
    });
  },
};
