"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG API
------------------------------------------------------- */

require("express-async-errors");

const passwordEncrypt = require("../helpers/passwordEncrypt");
const User = require("../models/user.model");

module.exports = {
  list: async (req, res) => {
    const data = await getModelList(User)
    res.status(200).send({
      error: false,
      data: data,
    });
  },
  create: async (req, res) => {
    const data = await User.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data: data,
    });
  },
  read: async (req, res) => {
    const data = await User.findOne({ _id: req.params.userId });
    res.status(202).send({
      error: false,
      data: data,
    });
  },
  update: async (req, res) => {
    const data = await User.updateOne({ _id: req.params.userId }, req.body);
    const newdata = await User.findOne({ _id: req.params.userId });
    res.status(202).send({
      error: false,
      body: req.body,
      data: data, // info about update
      // güncel veriyi istiyorsan tekrar çağır
      newdata: newdata,
    });
  },
  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.userId });
    // console.log(data);
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      // const user = await User.findOne({ email: email })
      const user = await User.findOne({ email });

      if (user && user.password == passwordEncrypt(password)) {
        // res.session= {
        //   email:user.email,
        //   password:user.password
        // }
        // res.session.email = user.email;
        /* SESSION */
        // req.session = {
        //     email: user.email,
        //     password: user.password
        // }
        // req.session.email = user.email // kötü niyetli kullanıcıya email gitmesin
        req.session.id = user.id;
        req.session.password = user.password;
        /* SESSION */

        /* COOKIE */ //? eğer işin içine maxAge girerse bu sefer cookie olacak
        if (req.body?.remindMe) {
          req.session.remindMe = req.body.remindMe;
          // SET maxAge: //! sessionOption.maxAge
          req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3; // 3 days
        }
        /* COOKIE */

        res.status(200).send({
          error: false,
          message: "Login OK",
          user,
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Login parameters are not true.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Email and password are required.");
    }
  },

  //*logout her türlü veriyi yok eder, session ve  cookie verileri boşalır null olur
  logout: async (req, res) => {
    req.session = null;
    res.status(200).send({
      error: false,
      message: "Logout OK",
    });
  },
};
