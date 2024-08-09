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

const insertCategorys = async (categorys) => {
  await prisma.category.createMany({
    data: categorys,
    skipDuplicates: true,
  });
};

module.exports = {
  categoryOne,
  categoryTwo,
  newCategory,
  insertCategorys,
};
