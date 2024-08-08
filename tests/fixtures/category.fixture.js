const faker = require("faker");
const prisma = require("../../prisma");
const { v4 } = require("uuid");

const categoryOne = {
  id: v4(),
  name: faker.name.findName(),
};

const categoryTwo = {
  id: v4(),
  name: faker.name.findName(),
};

const newCategory = {
  name: faker.name.findName(),
};

const insertCategorys = async (category) => {
  await prisma.category.createMany({
    data: category,
    skipDuplicates: true,
  });
};

module.exports = {
  categoryOne,
  categoryTwo,
  newCategory,
  insertCategorys,
};
