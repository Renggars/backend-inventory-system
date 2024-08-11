const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const orderService = require("../services/order.service");
const {
  responseApiSuccess,
  responseApiCreateSuccess,
} = require("../utils/responseApi");
const { paginationValidation } = require("../validations");

const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.body);

  responseApiCreateSuccess(res, "Create Order Success", order);
});

const getOrders = catchAsync(async (req, res) => {
  const { error, value } = paginationValidation.querySchema.validate(req.query);
  if (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Query invalid");
  }

  const { page, limit, ...filter } = value;
  const result = await orderService.queryOrders(filter, {
    page,
    limit,
  });

  responseApiSuccess(res, "Get CustomerOrders Success", result);
});

const getOrder = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }

  responseApiSuccess(res, "Get Order Success", order);
});

const updateOrder = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderById(
    req.params.orderId,
    req.body
  );
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }

  responseApiSuccess(res, "Update Order Success", order);
});

const deleteOrder = catchAsync(async (req, res) => {
  const order = await orderService.deleteOrderById(req.params.orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }
  responseApiSuccess(res, "Delete Order Success", null);
});

module.exports = { createOrder, getOrder, getOrders, updateOrder, deleteOrder };
