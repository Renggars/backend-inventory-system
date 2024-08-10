const faker = require("faker");
const prisma = require("../../prisma");
const { v4 } = require("uuid");
const { userOne, userTwo } = require("./user.fixture");

const customerOrderOne = {
  id: v4(),
  totalPrice: 0,
  customerName: faker.name.findName(),
  customerEmail: faker.internet.email().toLowerCase(),
  userId: userOne.id,
};

const customerOrderTwo = {
  id: v4(),
  totalPrice: 0,
  customerName: faker.name.findName(),
  customerEmail: faker.internet.email().toLowerCase(),
  userId: userTwo.id,
};

const newCustomerOrder = {
  totalPrice: 0,
  customerName: faker.name.findName(),
  customerEmail: faker.internet.email().toLowerCase(),
  userId: userTwo.id,
};

const updateCustomerOrder = {
  totalPrice: 0,
  customerName: faker.name.findName(),
  customerEmail: faker.internet.email().toLowerCase(),
  userId: userOne.id,
};

const insertCustomerOrder = async (customerOrder) => {
  await prisma.customerOrder.createMany({
    data: customerOrder,
    skipDuplicates: true,
  });
};

module.exports = {
  customerOrderOne,
  customerOrderTwo,
  newCustomerOrder,
  updateCustomerOrder,
  insertCustomerOrder,
};
