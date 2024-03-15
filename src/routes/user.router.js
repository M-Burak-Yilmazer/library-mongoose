const router = require("express").Router();

const User = require("../controllers/user.controller");

// User:
router.route("/users").get(User.list).post(User.create);
router
  .route("/users/:userId")
  .get(User.read)
  .put(User.update) // put patch aynı
  .patch(User.update)
  .delete(User.delete);

module.exports = router;

router.post("/login", User.login);
router.get("/logout", User.logout);
