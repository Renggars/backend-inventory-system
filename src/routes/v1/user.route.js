const express = require("express");
const { auth, authAcces } = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");

const router = express.Router();

router
  .route("/")
  .post(
    auth(),
    authAcces(),
    validate(userValidation.createUser),
    userController.createUser
  )
  .get(auth(), authAcces(), userController.getUsers);

router
  .route("/:userId")
  .get(
    auth(),
    authAcces(),
    validate(userValidation.getUser),
    userController.getUser
  )
  .put(
    auth(),
    authAcces(),
    validate(userValidation.updateUser),
    userController.updateUser
  )
  .delete(
    auth(),
    authAcces(),
    validate(userValidation.deleteUser),
    userController.deleteUser
  );

// router
//   .route("/:userId/update-password")
//   .patch(
//     auth(),
//     authAcces,
//     validate(userValidation.updatePassword),
//     userController.updateUser
//   )

module.exports = router;
