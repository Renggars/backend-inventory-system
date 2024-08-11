const faker = require("faker");
const prisma = require("../../prisma");
const { v4 } = require("uuid");
const { categoryOne, categoryTwo } = require("./category.fixture");
const { userOne, userTwo } = require("./user.fixture");

const productOne = {
  id: v4(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: 1000,
  quantityInStock: 10,
  categoryId: categoryOne.id,
  userId: userOne.id,
};

const newProduct = {
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: 2000,
  quantityInStock: 10,
  categoryId: categoryTwo.id,
  userId: userTwo.id,
};

const updateProduct = {
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: 5000,
  quantityInStock: 50,
  categoryId: categoryTwo.id,
  userId: userTwo.id,
};

const insertProduct = async (product) => {
  await prisma.product.createMany({
    data: product,
    skipDuplicates: true,
  });
};

module.exports = {
  productOne,
  newProduct,
  updateProduct,
  insertProduct,
};
