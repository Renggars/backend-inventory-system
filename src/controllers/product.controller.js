const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const productService = require("../services/product.service");
const {
  responseApiSuccess,
  responseApiCreateSuccess,
} = require("../utils/responseApi");
const { paginationValidation } = require("../validations");

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body);
  responseApiCreateSuccess(res, "Create Product Success", product);
});

const getProducts = catchAsync(async (req, res) => {
  const { error, value } = paginationValidation.querySchema.validate(req.query);
  if (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Query invalid");
  }

  const { page, limit, ...filter } = value;
  const result = await productService.queryProducts(filter, {
    page,
    limit,
  });

  responseApiSuccess(res, "Get Product Success", result);
});

const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.productId);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }

  responseApiSuccess(res, "Get Product Success", product);
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(
    req.params.productId,
    req.body
  );

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }

  responseApiSuccess(res, "Update Product Success", product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.productId);

  responseApiSuccess(res, "Delete Product Success", null);
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
