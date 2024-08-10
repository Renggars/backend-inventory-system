const request = require("supertest");
const httpStatus = require("http-status");
const app = require("../../src/app");
const { userOne, insertUsers, userTwo } = require("../fixtures/user.fixture");
const { adminAccessToken } = require("../fixtures/token.fixture");
const prisma = require("../../prisma");
const {
  newCustomerOrder,
  customerOrderOne,
  updateCustomerOrder,
} = require("../fixtures/customerOrder.fixture");

describe("Order routes", () => {
  beforeEach(async () => {
    await insertUsers([userOne, userTwo]);
  });
  describe("GET /v1/order", () => {
    it("should return 200 and successfully retrieve customerOrders if query is ok", async () => {
      const res = await request(app)
        .get("/v1/order")
        .query({ page: 1, limit: 10 })
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: true,
        statusCode: httpStatus.OK,
        message: expect.any(String),
        data: {
          orders: expect.arrayContaining([]),
          pagination: expect.objectContaining({}),
        },
      });
    });

    it("should return 400 Bad Request if pagination query parameters page are invalid or < 1", async () => {
      const invalidQueryPage = 0;
      // const QueryPageLessThan_1 = 0;
      await request(app)
        .get("/v1/order")
        .query({ page: invalidQueryPage })
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 Bad Request if pagination query parameters limit are invalid or < 1", async () => {
      const invalidQueryLimit = "invalid-limit-param";
      // const QueryLimitLessThan_1 = 0;
      await request(app)
        .get("/v1/order")
        .query({ limit: invalidQueryLimit })
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("GET /v1/order/:customerOrderId", () => {
    const id = customerOrderOne.id;
    it("should return 200 and successfully retrieve customerOrder if query is ok", async () => {
      const res = await request(app)
        .get(`/v1/order/${id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: true,
        statusCode: httpStatus.OK,
        message: expect.any(String),
        data: expect.objectContaining({}),
      });
    });

    it("should return 400 if customerOrderId is invalid", async () => {
      const id = "invalid-customerOrder-id";
      await request(app)
        .get(`/v1/category/${id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("POST /v1/order", () => {
    it("should return 201 and successfully create customerOrder if request data is ok", async () => {
      const res = await request(app)
        .post("/v1/order")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newCustomerOrder)
        .expect(httpStatus.CREATED);

      const customerOrderData = res.body.data;

      expect(res.body).toEqual({
        status: true,
        statusCode: httpStatus.CREATED,
        message: expect.any(String),
        data: {
          id: expect.anything(),
          totalPrice: newCustomerOrder.totalPrice,
          customerName: newCustomerOrder.customerName,
          customerEmail: newCustomerOrder.customerEmail,
          userId: newCustomerOrder.userId,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        },
      });

      const dbCustomerOrder = await prisma.customerOrder.findUnique({
        where: {
          id: customerOrderData.id,
        },
      });

      expect(dbCustomerOrder).toBeDefined();
      expect(dbCustomerOrder).toMatchObject({
        id: expect.anything(),
        totalPrice: newCustomerOrder.totalPrice,
        customerName: newCustomerOrder.customerName,
        customerEmail: newCustomerOrder.customerEmail,
        userId: newCustomerOrder.userId,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
    });

    it("should return 400 Bad Request when the request body is empty", async () => {
      await request(app)
        .post("/v1/order")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send({})
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 Bad Request when the request body totalPrice is empty or less than 0 or negative", async () => {
      newCustomerOrder.totalPrice = -1;
      await request(app)
        .post("/v1/order")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newCustomerOrder)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 Bad Request when the request body customerName is empty", async () => {
      newCustomerOrder.customerName = "";
      await request(app)
        .post("/v1/order")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newCustomerOrder)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 Bad Request when the request body customerEmail is empty", async () => {
      newCustomerOrder.customerEmail = "";
      await request(app)
        .post("/v1/order")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newCustomerOrder)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 Bad Request when the request body customerEmail is ivanlid", async () => {
      newCustomerOrder.customerEmail = "not-email";
      await request(app)
        .post("/v1/order")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newCustomerOrder)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 Bad Request when the request body userId is empty", async () => {
      newCustomerOrder.userId = "";
      await request(app)
        .post("/v1/order")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newCustomerOrder)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("PUT /v1/order/:customerOrderId", () => {
    const id = customerOrderOne.id;
    it("should return 200 and successfully update customerOrder if customerOrderId and request data are valid", async () => {
      const res = await request(app)
        .put(`/v1/order/${id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updateCustomerOrder)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: true,
        statusCode: httpStatus.OK,
        message: expect.any(String),
        data: {
          id: expect.anything(),
          totalPrice: updateCustomerOrder.totalPrice,
          customerName: updateCustomerOrder.customerName,
          customerEmail: updateCustomerOrder.customerEmail,
          userId: updateCustomerOrder.userId,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        },
      });
      const dbCustomerOrder = await prisma.customerOrder.findUnique({
        where: {
          id: id,
        },
      });
      expect(dbCustomerOrder).toBeDefined();
      expect(dbCustomerOrder).toMatchObject({
        id: expect.anything(),
        totalPrice: updateCustomerOrder.totalPrice,
        customerName: updateCustomerOrder.customerName,
        customerEmail: updateCustomerOrder.customerEmail,
        userId: updateCustomerOrder.userId,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
    });

    it("should return 400 if request input update data customerOrder is empty", async () => {
      await request(app)
        .put(`/v1/order/${id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send({})
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 Bad Request when the request body totalPrice is less than 0 or negative", async () => {
      await request(app)
        .put(`/v1/order/${id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send({ totalPrice: -1 })
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("DELETE /v1/order/:customerId", () => {
    const id = productOne.id;
    it("Should return 200 and successfully delete customerId if productId is valid", async () => {
      const res = await request(app)
        .delete(`/v1/order/${id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.OK);
      expect(res.body).toEqual({
        status: true,
        statusCode: httpStatus.OK,
        message: expect.any(String),
        data: null,
      });
      const customerOrderDb = await prisma.customerOrder.findUnique({
        where: {
          id: id,
        },
      });
      expect(customerOrderDb).toBeNull();
    });

    it("should return 400 if customerId is invalid", async () => {
      const id = "invalid-order-id";
      await request(app)
        .delete(`/v1/order/${id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 Not Found if no parameters are provided for delete", async () => {
      await request(app)
        .delete(`/v1/order/`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.NOT_FOUND);
    });
  });
});
