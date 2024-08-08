const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const categoryService = require("../services/category.service");
const {
  responseApiCreateSuccess,
  responseApiSuccess,
} = require("../utils/responseApi");

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  responseApiCreateSuccess(res, "Create Category Success", category);
  // res.status(httpStatus.CREATED).send({
  //   status: httpStatus.CREATED,
  //   message: "Create Category Success",
  //   data: category,
  // });
});

const getCategorys = catchAsync(async (req, res) => {
  const { page = 1, limit = 10, ...filter } = req.query;
  const result = await categoryService.queryCategorys(filter, {
    page: Number(page),
    limit: Number(limit),
  });

  responseApiSuccess(res, "Get Categorys Success", result);
  // res.status(httpStatus.OK).send({
  //   status: httpStatus.OK,
  //   message: "Get Categorys Success",
  //   data: result.categorys,
  //   pagination: {
  //     totalItems: result.totalItems,
  //     totalPages: result.totalPages,
  //     currentPage: result.currentPage,
  //   },
  // });
});

const getCategory = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
  }

  responseApiSuccess(res, "Get Category Success", category);

  // res.status(httpStatus.OK).send({
  //   status: httpStatus.OK,
  //   message: "Get Category Success",
  //   data: category,
  // });
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await categoryService.updateCategoryById(
    req.params.categoryId,
    req.body
  );
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
  }

  responseApiSuccess(res, "Update Category Success", category);
  // res.status(httpStatus.OK).send({
  //   status: httpStatus.OK,
  //   message: "Update Category Success",
  //   data: category,
  // });
});

const deleteCategory = catchAsync(async (req, res) => {
  const category = await categoryService.deleteCategoryById(
    req.params.categoryId
  );
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
  }
  responseApiSuccess(res, "Delete Category Success");
  // res.status(httpStatus.OK).send({
  //   status: httpStatus.OK,
  //   message: "Delete Category Success",
  //   data: null,
  // });
});

module.exports = {
  createCategory,
  getCategorys,
  getCategory,
  updateCategory,
  deleteCategory,
};
