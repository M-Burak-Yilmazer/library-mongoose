const userRouter = require("express").Router();

const User = require("../controllers/user.controller");
const idValidation = require("../middlewares/idValidation");

userRouter.get("/users").get(User.list).post(User.create);
userRouter
  .route("/users/:userId")
  .all(idValidation)
  .get(User.read)
  .put(User.update)
  .patch(User.update)
  .delete(User.delete);
