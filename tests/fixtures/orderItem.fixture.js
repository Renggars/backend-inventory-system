const faker = require("faker");
const prisma = require("../../prisma");
const { v4 } = require("uuid");
const {
  customerOrderOne,
  customerOrderTwo,
} = require("./customerOrder.fixture");
const { productOne } = require("./product.fixture");

const orderItemOne = {
  id: v4(),
  orderId: customerOrderOne.id,
  productId: productOne.id,
  quantity: 2,
};

const orderItemTwo = {
  id: v4(),
  orderId: customerOrderTwo.id,
  productId: productOne.id,
  quantity: 2,
};

const newOrderItem = {
  orderId: customerOrderTwo.id,
  productId: productOne.id,
  quantity: 2,
};

const updateOrderItem = {
  orderId: customerOrderTwo.id,
  productId: productOne.id,
  quantity: 5,
};

const insertOrderItem = async (orderItem) => {
  await prisma.orderItem.createMany({
    data: orderItem,
    skipDuplicates: true,
  });
};

module.exports = {
  orderItemOne,
  orderItemTwo,
  newOrderItem,
  updateOrderItem,
  insertOrderItem,
};
