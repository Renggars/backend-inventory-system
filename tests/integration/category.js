const request = require("supertest");
const httpStatus = require("http-status");
const app = require("../../src/app");
const { userOne, insertUsers } = require("../fixtures/user.fixture");
const { userOneAccessToken } = require("../fixtures/token.fixture");
const prisma = require("../../prisma");
const {
  insertCategorys,
  categoryOne,
  newCategory,
  categoryTwo,
} = require("../fixtures/category.fixture");

describe("Category routes", () => {
  beforeEach(async () => {
    await insertUsers([userOne]);
  });
  describe("GET /v1/category", () => {
    beforeEach(async () => {
      await insertCategorys([categoryOne, categoryTwo]);
    });
    it("should return 200 and successfully retrieve categorys if query is ok", async () => {
      const res = await request(app)
        .get("/v1/category")
        .query({ page: 1, limit: 10 })
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);
      expect(res.body).toEqual({
        status: true,
        statusCode: httpStatus.OK,
        message: expect.any(String),
        data: expect.objectContaining({}),
      });
    });

    it("should return 400 Bad Request if pagination query parameters are invalid", async () => {
      await request(app)
        .get("/v1/category")
        .query({ page: 0, limit: 0 })
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("GET /v1/category/:id", () => {
    beforeEach(async () => {
      await insertCategorys([categoryOne, categoryTwo]);
    });
    const id = categoryOne.id;

    it("should return 200 and successfully retrieve category if query is ok", async () => {
      const res = await request(app)
        .get(`/v1/category/${id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: true,
        statusCode: httpStatus.OK,
        message: expect.any(String),
        data: expect.objectContaining({}),
      });
    });

    it("should return 400 if categoryId is invalid", async () => {
      const id = "invalid-category-id";
      await request(app)
        .get(`/v1/category/${id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("POST /v1/category", () => {
    beforeEach(async () => {
      await insertUsers([userOne]);
    });
    it("should return 201 and successfully create category if request data is ok", async () => {
      const res = await request(app)
        .post("/v1/category")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newCategory)
        .expect(httpStatus.CREATED);

      const categoryData = res.body.data;

      expect(res.body).toEqual({
        status: true,
        statusCode: httpStatus.CREATED,
        message: expect.any(String),
        data: {
          id: expect.anything(),
          name: newCategory.name,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        },
      });

      const dbCategory = await prisma.category.findUnique({
        where: {
          id: categoryData.id,
        },
      });
      expect(dbCategory).toBeDefined();
      expect(dbCategory).toMatchObject({
        id: expect.anything(),
        name: newCategory.name,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
    });

    it("should return 400 Bad Request when the request body is empty", async () => {
      await request(app)
        .post("/v1/category")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send({})
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("PUT /v1/category/:categoryId", () => {
    beforeEach(async () => {
      await insertCategorys([categoryOne]);
    });
    const updateCategory = {
      name: "update",
    };
    const id = categoryOne.id;
    it("should return 200 and successfully update category if userId and request data are valid", async () => {
      const res = await request(app)
        .put(`/v1/category/${id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(updateCategory)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: true,
        statusCode: httpStatus.OK,
        message: expect.any(String),
        data: {
          id: expect.anything(),
          name: updateCategory.name,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        },
      });
      const dbCategory = await prisma.category.findUnique({
        where: {
          id: id,
        },
      });
      expect(dbCategory).toBeDefined();
      expect(dbCategory).toMatchObject({
        id: expect.anything(),
        name: updateCategory.name,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
    });
    it("should return 400 if request input update data category is empty", async () => {
      await request(app)
        .put(`/v1/category/${id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send({})
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("DELETE /v1/category/:categoryId", () => {
    beforeEach(async () => {
      await insertCategorys([categoryOne, categoryTwo]);
    });

    it("Should return 200 and successfully delete category if userId is valid", async () => {
      const id = categoryOne.id;
      const res = await request(app)
        .delete(`/v1/category/${id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);
      expect(res.body).toEqual({
        status: true,
        statusCode: httpStatus.OK,
        message: expect.any(String),
        data: null,
      });
      const categoryDb = await prisma.category.findUnique({
        where: {
          id: id,
        },
      });
      expect(categoryDb).toBeNull();
    });

    it("should return 400 if userId is invalid", async () => {
      const id = "invalid-category-id";
      await request(app)
        .delete(`/v1/category/${id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 Not Found if no parameters are provided for delete", async () => {
      await request(app)
        .delete(`/v1/category`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.NOT_FOUND);
    });
  });
});
