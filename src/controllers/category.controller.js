const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const categoryService = require("../services/category.service");
const {
  responseApiCreateSuccess,
  responseApiSuccess,
} = require("../utils/responseApi");
const { paginationValidation } = require("../validations");

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  responseApiCreateSuccess(res, "Create Category Success", category);
});

const getCategorys = catchAsync(async (req, res) => {
  const { error, value } = paginationValidation.querySchema.validate(req.query);
  if (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Query invalid");
  }

  const { page, limit, ...filter } = value;
  const result = await categoryService.queryCategorys(filter, {
    page,
    limit,
  });

  responseApiSuccess(res, "Get Categorys Success", result);
});

const getCategory = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
  }

  responseApiSuccess(res, "Get Category Success", category);
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
});

const deleteCategory = catchAsync(async (req, res) => {
  const category = await categoryService.deleteCategoryById(
    req.params.categoryId
  );
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
  }
  responseApiSuccess(res, "Delete Category Success", null);
});

module.exports = {
  createCategory,
  getCategorys,
  getCategory,
  updateCategory,
  deleteCategory,
};
