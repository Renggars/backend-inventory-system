const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const productService = require("../services/product.service");
const {
  responseApiSuccess,
  responseApiCreateSuccess,
} = require("../utils/responseApi");

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body);
  responseApiCreateSuccess(res, "Create Product Success", product);

  // res.status(httpStatus.CREATED).send({
  //   status: httpStatus.CREATED,
  //   message: "Create Product Success",
  //   data: product,
  // });
});

const getProducts = catchAsync(async (req, res) => {
  const { page = 1, limit = 10, ...filter } = req.query;
  const result = await categoryService.queryCategorys(filter, {
    page: Number(page),
    limit: Number(limit),
  });

  responseApiSuccess(res, "Get Product Success", result);
  // res.status(httpStatus.OK).send({
  //   status: httpStatus.OK,
  //   message: "Get Products Succes",
  //   data: result,
  // });
});

const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.productId);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }

  responseApiSuccess(res, "Get Product Success", product);
  // res.status(httpStatus.OK).send({
  //   status: httpStatus.OK,
  //   message: "Get Product Success",
  //   data: product,
  // });
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
  // res.status(httpStatus.OK).send({
  //   status: httpStatus.OK,
  //   message: "Update Product Success",
  //   data: product,
  // });
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.productId);

  responseApiSuccess(res, "Delete Product Success");
  // res.status(httpStatus.OK).send({
  //   status: httpStatus.OK,
  //   message: "Delete Product Success",
  //   data: null,
  // });
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
