const userService = require("../services/user.service");
const { password } = require("../validations/custom.validation");

const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, ...filter } = req.query;
    const result = await categoryService.queryCategorys(filter, {
      page: Number(page),
      limit: Number(limit),
    });
    
    res.status(200).json({
      status: 200,
      message: "Succes get users",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: "Failed get users",
      error: err.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const result = await userService.getUserById(req.params.userId);
    res.status(200).json({
      status: 200,
      message: "Succes get user",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: "Failed get user",
      error: err.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const result = await userService.createUser(req.body);
    res.status(200).json({
      status: 200,
      message: "Succes create user",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: "Failed create user",
      error: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const result = await userService.updateUserById(
      req.params.userId,
      req.body
    );
    res.status(200).json({
      status: 200,
      message: "Succes update user",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: "Failed update user",
      error: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUserById(req.params.userId);
    res.status(200).json({
      status: 200,
      message: "Succes delete user",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: "Failed update user",
      error: err.message,
    });
  }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
