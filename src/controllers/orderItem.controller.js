const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const orderItemService = require("../services/oderItem.service");

const createOrderItem = catchAsync(async (req, res) => {
  const { orderId, productId, quantity } = req.body;
  const orderItem = await orderItemService.createOrderItem(
    orderId,
    productId,
    quantity
  );

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: "Create Order Item Succesz",
    data: orderItem,
  });
});

const getOrderItems = catchAsync(async (req, res) => {
  const { page = 1, limit = 10, ...filter } = req.query;
  const result = await categoryService.queryCategorys(filter, {
    page: Number(page),
    limit: Number(limit),
  });

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Get Order Items Succes",
    data: result,
  });
});

const getOrderItem = catchAsync(async (req, res) => {
  const orderItem = await orderItemService.getOrderItemById(
    req.params.orderItemId
  );
  if (!orderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order Item not found");
  }

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Get Order Item Succes",
    data: orderItem,
  });
});

const updateOrderItem = catchAsync(async (req, res) => {
  const orderItem = await orderItemService.updateOrderItemById(
    req.params.orderItemId,
    req.body
  );
  if (!orderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order Item not found");
  }

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Update Order Item Succes",
    data: orderItem,
  });
});

const deleteOrderItem = catchAsync(async (req, res) => {
  await orderItemService.deleteOrderItemById(req.params.orderItemId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Delete Order Item Succes",
    data: null,
  });
});

module.exports = {
  createOrderItem,
  getOrderItem,
  getOrderItems,
  updateOrderItem,
  deleteOrderItem,
};
