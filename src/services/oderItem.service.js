const httpStatus = require("http-status");
const prisma = require("../../prisma/index");
const ApiError = require("../utils/ApiError");

const productService = require("../services/product.service");
const orderService = require("../services/order.service");

/**
 * Create a orderItem
 * @returns {Promise<OrderItem>}
 */
const createOrderItem = async (orderId, productId, quantity) => {
  const product = await productService.getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product fot found");
  }

  if (product.quantityInStock < quantity) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Insufficient stock");
  }

  const unitPrice = product.price;
  const order = await orderService.getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }

  order.totalPrice += unitPrice * quantity;
  await orderService.updateOrderById(orderId, { totalPrice: order.totalPrice });

  product.quantityInStock -= quantity;
  await productService.updateProductById(productId, {
    quantityInStock: product.quantityInStock,
  });

  const orderItem = await prisma.orderItem.create({
    data: {
      orderId,
      productId,
      quantity,
      unitPrice,
    },
  });

  return orderItem;
};

/**
 * Query for orders
 * @returns {Promise<QueryResult>}
 */
const queryOrderItems = async (filter, options) => {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;

  const orderItems = await prisma.orderItem.findMany({
    skip,
    take: limit,
    where: filter,
  });

  const totalItems = await prisma.orderItem.count({ where: filter });
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = page;

  return { orderItems, totalItems, totalPages, currentPage };
};

/**
 * Get orderItem by id
 * @param {ObjectId} id
 * @returns {Promise<OrderItem>}
 */
const getOrderItemById = async (id) => {
  const orderItem = await prisma.orderItem.findUnique({
    where: {
      id: id,
    },
  });
  return orderItem;
};

/**
 * Update orderItem by id
 * @param {ObjectId} orderItemId
 * @param {Object} updateBody
 * @returns {Promise<OrderItem>}
 */
const updateOrderItemById = async (orderItemId, updateBody) => {
  const orderItem = await getOrderItemById(orderItemId);
  if (!orderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order item not found");
  }
  const updateOrderItem = await prisma.orderItem.update({
    where: {
      id: orderItemId,
    },
    data: updateBody,
  });

  return updateOrderItem;
};

/**
 * Delete category by id
 * @param {ObjectId} orderItemId
 * @returns {Promise<OrderItem>}
 */
const deleteOrderItemById = async (orderItemId) => {
  const orderItem = await getOrderItemById(orderItemId);
  if (!orderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order item not foudn");
  }

  const deleteOrderItem = await prisma.orderItem.delete({
    where: {
      id: orderItemId,
    },
  });

  return deleteOrderItem;
};

module.exports = {
  createOrderItem,
  queryOrderItems,
  getOrderItemById,
  updateOrderItemById,
  deleteOrderItemById,
};
