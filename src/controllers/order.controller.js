const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const orderService = require("../services/order.service");

const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.body);

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: "Create Order Succes",
    data: order,
  });
});

const getOrders = catchAsync(async (req, res) => {
  const { page = 1, limit = 10, ...filter } = req.query;
  const result = await orderService.queryOrders(filter, { page: Number(page), limit: Number(limit)});

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Get Orders Succes",
    data: result,
  });
});

const getOrder = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Get Order Succes",
    data: order,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderById(
    req.params.orderId,
    req.body
  );
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Update Order Succes",
    data: order,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  await orderService.deleteOrderById(req.params.orderId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Delete Order Succes",
    data: null,
  });
});

module.exports = { createOrder, getOrder, getOrders, updateOrder, deleteOrder };
