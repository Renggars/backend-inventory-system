const prisma = require("../../prisma");
const { v4 } = require("uuid");
const {
  customerOrderOne,
  customerOrderTwo,
  insertCustomerOrder,
} = require("./customerOrder.fixture");
const { productOne, productTwo, insertProduct } = require("./product.fixture");
beforeEach(async () => {
  await insertCustomerOrder([customerOrderOne, customerOrderTwo]);
  await insertProduct([productOne, productTwo]);
  console.log(customerOrderOne);
  console.log(productOne);
  const orders = await prisma.customerOrder.findUnique({
    where: { id: customerOrderOne.id },
  });
});

const orderItemOne = {
  id: v4(),
  orderId: customerOrderOne.id,
  productId: productOne.id,
  quantity: 2,
  unitPrice: productOne.price,
};

const orderItemTwo = {
  id: v4(),
  orderId: customerOrderTwo.id,
  productId: productOne.id,
  quantity: 2,
  unitPrice: productOne.price,
};

const newOrderItem = {
  orderId: customerOrderTwo.id,
  productId: productOne.id,
  quantity: 2,
  unitPrice: productOne.price,
};

const updateOrderItem = {
  orderId: customerOrderTwo.id,
  productId: productOne.id,
  quantity: 5,
  unitPrice: productOne.price,
};

const insertOrderItem = async (dataOrderItem) => {
  try {
    // Cek apakah order dan product exist
    const orderExist = await prisma.customerOrder.findUnique({
      where: { id: dataOrderItem.orderId },
    });
    const productExist = await prisma.product.findUnique({
      where: { id: dataOrderItem.productId },
    });

    if (!orderExist || !productExist) {
      throw new Error("Order or Product does not exist");
    }

    await prisma.orderItem.create({
      data: dataOrderItem,
    });
  } catch (error) {
    console.error("Error inserting order item:", error.message);
    throw error; // Biarkan error untuk tetap muncul
  }
};

module.exports = {
  orderItemOne,
  orderItemTwo,
  newOrderItem,
  updateOrderItem,
  insertOrderItem,
};
