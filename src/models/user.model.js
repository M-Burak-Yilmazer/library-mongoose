const mongoose = require("mongoose");

const passwordEncrypt = require("../helpers/passwordEncrypt");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "email must be required"],
      trim: true,
      validate: [
        (email) => {
          if (email.includes("@") && email.includes(".")) {
            return true;
          }
          return false;
        },
        "Email must be required",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: true,
      set: (password) => passwordEncrypt(password),
    },
    firstName: String,
    lastName: String,
  },
  {
    collection: "user",
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
