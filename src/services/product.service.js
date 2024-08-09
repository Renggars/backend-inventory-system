const httpStatus = require("http-status");
const prisma = require("../../prisma/index");
const ApiError = require("../utils/ApiError");

/**
 * Create a category
 * @param {Object} categoryProduct
 * @returns {Promise<Product>}
 */
const createProduct = async (createProduct) => {
  const product = await prisma.product.create({
    data: createProduct,
  });
  return product;
};

/**
 * Query for products
 * @returns {Promise<QueryResult>}
 */
const queryProducts = async (filter, options) => {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * 10;

  const products = await prisma.product.findMany({
    skip,
    take: limit,
    where: filter,
  });

  const totalItems = await prisma.product.count({ where: filter });
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = page;

  const pagination = {
    totalItems,
    totalPages,
    currentPage,
  };

  return { products, pagination };
};

/**
 * Get product by id
 * @param {ObjectId} productId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const getProductById = async (productId, updateBody) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    data: updateBody,
  });
  return product;
};

/**
 * Update product by id
 * @param {ObjectId} productId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateProductById = async (productId, updateBody) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  const updateProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: updateBody,
  });

  return updateProduct;
};

/**
 * Delete category by id
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const deleteProductById = async (productId) => {
  const product = await getProductById(productId);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }

  const deleteProduct = await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  return deleteProduct;
};

module.exports = {
  createProduct,
  queryProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
