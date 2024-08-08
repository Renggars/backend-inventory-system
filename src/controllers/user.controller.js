const userService = require("../services/user.service");
const ApiError = require("../utils/ApiError");
const {
  responseApiSuccess,
  responseApiFailed,
  responseApiCreateSuccess,
} = require("../utils/responseApi");
const userValidation = require("../validations/user.validation");

const getUsers = async (req, res) => {
  try {
    const { error, value } = userValidation.querySchema.validate(req.query);
    if (error) {
      throw error;
    }

    const { page, limit, ...filter } = value;
    const result = await userService.queryUsers(filter, {
      page,
      limit,
    });

    responseApiSuccess(res, "Success get users", result);
  } catch (err) {
    responseApiFailed(res, "Failed get users");
  }
};

const getUser = async (req, res) => {
  try {
    const result = await userService.getUserById(req.params.userId);
    responseApiSuccess(res, "Success get user", result);
  } catch (err) {
    responseApiFailed(res, "Failed get user");
  }
};

const createUser = async (req, res) => {
  try {
    const result = await userService.createUser(req.body);
    responseApiCreateSuccess(res, "Success create user", result);
  } catch (err) {
    responseApiFailed(res, "Failed create user");
  }
};

const updateUser = async (req, res) => {
  try {
    const result = await userService.updateUserById(
      req.params.userId,
      req.body
    );
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    }
    responseApiSuccess(res, "Success update user", result);
  } catch (err) {
    console.log(err);
    responseApiFailed(res, "Failed update user");
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUserById(req.params.userId);
    responseApiSuccess(res, "Success delete user", result);
  } catch (err) {
    console.log(err);
    responseApiFailed(res, "Failed delete user");
  }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
