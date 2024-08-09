const request = require("supertest");
const httpStatus = require("http-status");
const app = require("../../src/app");
const { userOne, insertUsers, userTwo } = require("../fixtures/user.fixture");
const { userOneAccessToken } = require("../fixtures/token.fixture");
const prisma = require("../../prisma");
const {
  insertCategorys,
  categoryOne,
  newCategory,
  categoryTwo,
} = require("../fixtures/category.fixture");
const {
  productOne,
  newProduct,
  updateProduct,
} = require("../fixtures/product.fixture");

describe("Category routes", () => {
  beforeEach(async () => {
    await insertUsers([userOne, userTwo]);
    await insertCategorys([categoryOne, categoryTwo]);
  });
  describe("GET /v1/product", () => {
    it("should return 200 and successfully retrieve products if query is ok", async () => {
      const res = await request(app)
        .get("/v1/product")
        .query({ page: 1, limit: 10 })
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: true,
        statusCode: httpStatus.OK,
        message: expect.any(String),
        data: {
          products: expect.arrayContaining([]),
          pagination: expect.objectContaining({}),
        },
      });
    });

    it("should return 400 Bad Request if pagination query parameters page are invalid or < 1", async () => {
      const invalidQueryPage = 0;
      await request(app)
        .get("/v1/product")
        .query({ page: invalidQueryPage })
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 Bad Request if pagination query parameters limit are invalid or < 1", async () => {
      const invalidQueryLimit = 0;
      await request(app)
        .get("/v1/product")
        .query({ limit: invalidQueryLimit })
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("GET /v1/product/:productId", () => {
    const id = productOne.id;
    it("should return 200 and successfully retrieve product if query is ok", async () => {
      const res = await request(app)
        .get(`/v1/product/${id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: true,
        statusCode: httpStatus.OK,
        message: expect.any(String),
        data: expect.objectContaining({}),
      });
    });

    it("should return 400 if productId is invalid", async () => {
      const id = "invalid-product-id";
      await request(app)
        .get(`/v1/category/${id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("POST /v1/product", () => {
    it("should return 201 and successfully create product if request data is ok", async () => {
      const res = await request(app)
        .post("/v1/product")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newProduct)
        .expect(httpStatus.CREATED);

      const productData = res.body.data;

      expect(res.body).toEqual({
        status: true,
        statusCode: httpStatus.CREATED,
        message: expect.any(String),
        data: {
          id: expect.anything(),
          name: newProduct.name,
          description: newProduct.description,
          price: newProduct.price,
          quantityInStock: newProduct.quantityInStock,
          categoryId: newProduct.categoryId,
          userId: newProduct.userId,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        },
      });

      const dbCategory = await prisma.category.findUnique({
        where: {
          id: productData.id,
        },
      });
      expect(dbCategory).toBeDefined();
      expect(dbCategory).toMatchObject({
        id: expect.anything(),
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        quantityInStock: newProduct.quantityInStock,
        categoryId: newProduct.categoryId,
        userId: newProduct.userId,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
    });

    it("should return 400 Bad Request when the request body is empty", async () => {
      await request(app)
        .post("/v1/product")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send({})
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 Bad Request when the request body name is empty", async () => {
      newProduct.name = "";
      await request(app)
        .post("/v1/product")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newProduct)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 Bad Request when the request body description is empty", async () => {
      newProduct.description = "";
      await request(app)
        .post("/v1/product")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newProduct)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 Bad Request when the request body price is empty", async () => {
      newProduct.price = "";
      await request(app)
        .post("/v1/product")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newProduct)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 Bad Request when the request body quantityInStock is empty", async () => {
      newProduct.quantityInStock = "";
      await request(app)
        .post("/v1/product")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newProduct)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 Bad Request when the request body categoryId is empty", async () => {
      newProduct.categoryId = "";
      await request(app)
        .post("/v1/product")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newProduct)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 Bad Request when the request body userId is empty", async () => {
      newProduct.userId = "";
      await request(app)
        .post("/v1/product")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newProduct)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("PUT /v1/product/:productId", () => {
    const id = productOne.id;
    it("should return 200 and successfully update product if userId and request data are valid", async () => {
      const res = await request(app)
        .put(`/v1/product/${id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(updateProduct)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: true,
        statusCode: httpStatus.OK,
        message: expect.any(String),
        data: {
          id: expect.anything(),
          name: updateProduct.name,
          description: updateProduct.description,
          price: updateProduct.price,
          quantityInStock: updateProduct.quantityInStock,
          categoryId: updateProduct.categoryId,
          userId: updateProduct.userId,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        },
      });
      const dbProduct = await prisma.product.findUnique({
        where: {
          id: id,
        },
      });
      expect(dbProduct).toBeDefined();
      expect(dbProduct).toMatchObject({
        id: expect.anything(),
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        quantityInStock: newProduct.quantityInStock,
        categoryId: newProduct.categoryId,
        userId: newProduct.userId,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
    });

    it("should return 400 if request input update data product is empty", async () => {
      await request(app)
        .put(`/v1/product/${id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send({})
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 Bad Request when the request body price is less than 1 or negative", async () => {
      await request(app)
        .put(`/v1/product/${id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send({ price: 0 })
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 Bad Request when the request body quantityInStock is less than 0 or negative", async () => {
      await request(app)
        .put(`/v1/product/${id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send({ quantityInStock: -1 })
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("DELETE /v1/product/:productId", () => {
    const id = productOne.id;
    it("Should return 200 and successfully delete product if productId is valid", async () => {
      const res = await request(app)
        .put(`/v1/product/${id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);
      expect(res.body).toEqual({
        status: true,
        statusCode: httpStatus.OK,
        message: expect.any(String),
        data: null,
      });
      const productDb = await prisma.product.findUnique({
        where: {
          id: id,
        },
      });
      expect(productDb).toBeNull();
    });

    it("should return 400 if productId is invalid", async () => {
      const id = "invalid-product-id";
      await request(app)
        .delete(`/v1/product/${id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 Not Found if no parameters are provided for delete", async () => {
      await request(app)
        .delete(`/v1/product/`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.NOT_FOUND);
    });
  });
});
