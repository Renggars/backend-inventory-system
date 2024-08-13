const request = require("supertest");
const httpStatus = require("http-status");
const app = require("../../src/app");
const {
  insertUsers,
  admin,
  userTwo,
  userOne,
} = require("../fixtures/user.fixture");
const { adminAccessToken } = require("../fixtures/token.fixture");
const prisma = require("../../prisma");
const {
  newOrderItem,
  insertOrderItem,
  orderItemOne,
  orderItemTwo,
  updateOrderItem,
} = require("../fixtures/orderItem.fixture");
const {
  insertProduct,
  productOne,
  productTwo,
} = require("../fixtures/product.fixture");
const {
  insertCustomerOrder,
  customerOrderOne,
  customerOrderTwo,
} = require("../fixtures/customerOrder.fixture");

describe("Order routes", () => {
  beforeEach(async () => {
    await insertUsers([admin]);
    await insertCustomerOrder([customerOrderOne, customerOrderTwo]);
    await insertProduct([productOne, productTwo]);
    await insertOrderItem(orderItemOne);
  });
  // describe("GET /v1/orderItem", () => {
  //   it("should return 200 and successfully retrieve orderItems if query is ok", async () => {
  //     const res = await request(app)
  //       .get("/v1/orderItem")
  //       .query({ page: 1, limit: 10 })
  //       .set("Authorization", `Bearer ${adminAccessToken}`)
  //       .expect(httpStatus.OK);

  //     expect(res.body).toEqual({
  //       status: true,
  //       statusCode: httpStatus.OK,
  //       message: expect.any(String),
  //       data: {
  //         orderItems: expect.arrayContaining([]),
  //         pagination: expect.objectContaining({}),
  //       },
  //     });
  //   });

  //   it("should return 400 Bad Request if pagination query parameters page are invalid or < 1", async () => {
  //     const invalidQueryPage = "invali-query";
  //     // const QueryPageLessThan_1 = 0;
  //     await request(app)
  //       .get("/v1/orderItem")
  //       .query({ page: invalidQueryPage })
  //       .set("Authorization", `Bearer ${adminAccessToken}`)
  //       .expect(httpStatus.BAD_REQUEST);
  //   });

  //   it("should return 400 Bad Request if pagination query parameters limit are invalid or < 1", async () => {
  //     const invalidQueryLimit = "invalid-limit-param";
  //     // const QueryLimitLessThan_1 = 0;
  //     await request(app)
  //       .get("/v1/orderItem")
  //       .query({ limit: invalidQueryLimit })
  //       .set("Authorization", `Bearer ${adminAccessToken}`)
  //       .expect(httpStatus.BAD_REQUEST);
  //   });
  // });

  describe("GET /v1/orderItem/:orderItemId", () => {
    it("should return 200 and successfully retrieve orderItem if query is ok", async () => {
      const id = orderItemOne.id;
      const res = await request(app)
        .get(`/v1/orderItem/${id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: true,
        statusCode: httpStatus.OK,
        message: expect.any(String),
        data: expect.objectContaining({
          id: orderItemOne.id,
          orderId: orderItemOne.orderId,
          productId: orderItemOne.productId,
          quantity: orderItemOne.quantity,
          unitPrice: orderItemOne.unitPrice,
        }),
      });
    });

    // it("should return 400 if orderItemId is invalid", async () => {
    //   const id = "invalid-customerOrder-id";
    //   await request(app)
    //     .get(`/v1/orderItem/${id}`)
    //     .set("Authorization", `Bearer ${adminAccessToken}`)
    //     .expect(httpStatus.BAD_REQUEST);
    // });
  });

  // describe("POST /v1/orderItem", () => {
  //   it("should return 201 and successfully create orderItem if request data is ok", async () => {
  //     const res = await request(app)
  //       .post("/v1/orderItem")
  //       .set("Authorization", `Bearer ${adminAccessToken}`)
  //       .send(newOrderItem)
  //       .expect(httpStatus.CREATED);

  //     const orderItemData = res.body.data;

  //     expect(res.body).toEqual({
  //       status: true,
  //       statusCode: httpStatus.CREATED,
  //       message: expect.any(String),
  //       data: {
  //         id: expect.anything(),
  //         productId: newOrderItem.orderId,
  //         productId: newOrderItem.productId,
  //         quantity: newOrderItem.quantity,
  //         unitPrice: newOrderItem.unitPrice,
  //         createdAt: expect.anything(),
  //         updatedAt: expect.anything(),
  //       },
  //     });

  //     const dbOrderItem = await prisma.orderItem.findUnique({
  //       where: {
  //         id: orderItemData.id,
  //       },
  //     });

  //     expect(dbOrderItem).toBeDefined();
  //     expect(dbOrderItem).toMatchObject({
  //       id: expect.anything(),
  //       orderId: newOrderItem.orderId,
  //       productId: newOrderItem.productId,
  //       quantity: newOrderItem.quantity,
  //       unitPrice: 1000,
  //       createdAt: expect.anything(),
  //       updatedAt: expect.anything(),
  //     });
  //   });

  //   // it("should return 400 Bad Request when the request body is empty", async () => {
  //   //   await request(app)
  //   //     .post("/v1/orderItem")
  //   //     .set("Authorization", `Bearer ${adminAccessToken}`)
  //   //     .send({})
  //   //     .expect(httpStatus.BAD_REQUEST);
  //   // });

  //   // it("should return 400 Bad Request when the request body orderId  is empty", async () => {
  //   //   newOrderItem.orderId = "";
  //   //   await request(app)
  //   //     .post("/v1/orderItem")
  //   //     .set("Authorization", `Bearer ${adminAccessToken}`)
  //   //     .send(newOrderItem)
  //   //     .expect(httpStatus.BAD_REQUEST);
  //   // });

  //   // it("should return 400 Bad Request when the request body productId is empty", async () => {
  //   //   newOrderItem.productId = "";
  //   //   await request(app)
  //   //     .post("/v1/orderItem")
  //   //     .set("Authorization", `Bearer ${adminAccessToken}`)
  //   //     .send(newOrderItem)
  //   //     .expect(httpStatus.BAD_REQUEST);
  //   // });

  //   // it("should return 400 Bad Request when the request body quantity is empty", async () => {
  //   //   newOrderItem.quantity = "";
  //   //   await request(app)
  //   //     .post("/v1/orderItem")
  //   //     .set("Authorization", `Bearer ${adminAccessToken}`)
  //   //     .send(newOrderItem)
  //   //     .expect(httpStatus.BAD_REQUEST);
  //   // });

  //   // it("should return 400 Bad Request when the request body  quantity is ivanlid or less than 1 or negative", async () => {
  //   //   newOrderItem.quantity = 0;
  //   //   await request(app)
  //   //     .post("/v1/orderItem")
  //   //     .set("Authorization", `Bearer ${adminAccessToken}`)
  //   //     .send(newOrderItem)
  //   //     .expect(httpStatus.BAD_REQUEST);
  //   // });
  // });

  // describe("PUT /v1/orderItem/:orderItemId", () => {
  //   const id = orderItemOne.id;
  //   it("should return 200 and successfully update orderItem if orderItemId and request data are valid", async () => {
  //     const res = await request(app)
  //       .put(`/v1/orderItem/${id}`)
  //       .set("Authorization", `Bearer ${adminAccessToken}`)
  //       .send(updateOrderItem)
  //       .expect(httpStatus.OK);

  //     expect(res.body).toEqual({
  //       status: true,
  //       statusCode: httpStatus.OK,
  //       message: expect.any(String),
  //       data: {
  //         id: expect.anything(),
  //         orderId: updateOrderItem.orderId,
  //         productId: updateOrderItem.productId,
  //         quantity: updateOrderItem.quantity,
  //         unitPrice: expect.anything(Number),
  //         createdAt: expect.anything(),
  //         updatedAt: expect.anything(),
  //       },
  //     });
  //     const dbOrderItem = await prisma.orderItem.findUnique({
  //       where: {
  //         id: id,
  //       },
  //     });
  //     expect(dbOrderItem).toBeDefined();
  //     expect(dbOrderItem).toMatchObject({
  //       id: expect.anything(),
  //       orderId: updateOrderItem.orderId,
  //       productId: updateOrderItem.productId,
  //       quantity: updateOrderItem.quantity,
  //       unitPrice: expect.anything(Number),
  //       createdAt: expect.anything(),
  //       updatedAt: expect.anything(),
  //     });
  //   });

  //   it("should return 400 if request body update data orderId is empty", async () => {
  //     await request(app)
  //       .put(`/v1/order/${id}`)
  //       .set("Authorization", `Bearer ${adminAccessToken}`)
  //       .send({})
  //       .expect(httpStatus.BAD_REQUEST);
  //   });

  //   it("should return 400 if request body update data orderId is invalid", async () => {
  //     await request(app)
  //       .put(`/v1/order/${id}`)
  //       .set("Authorization", `Bearer ${adminAccessToken}`)
  //       .send({ orderId: "invalid-orderId" })
  //       .expect(httpStatus.BAD_REQUEST);
  //   });

  //   it("should return 400 if request body update data productId is empty", async () => {
  //     await request(app)
  //       .put(`/v1/order/${id}`)
  //       .set("Authorization", `Bearer ${adminAccessToken}`)
  //       .send({})
  //       .expect(httpStatus.BAD_REQUEST);
  //   });

  //   it("should return 400 if request body update data productId is invalid", async () => {
  //     await request(app)
  //       .put(`/v1/order/${id}`)
  //       .set("Authorization", `Bearer ${adminAccessToken}`)
  //       .send({ productId: "invalid-productId" })
  //       .expect(httpStatus.BAD_REQUEST);
  //   });

  //   it("should return 400 Bad Request when the request body quantity is less than 0 or negative", async () => {
  //     await request(app)
  //       .put(`/v1/order/${id}`)
  //       .set("Authorization", `Bearer ${adminAccessToken}`)
  //       .send({ totalPrice: 0 })
  //       .expect(httpStatus.BAD_REQUEST);
  //   });
  // });

  // describe("DELETE /v1/orderItem/:orderItemId", () => {
  //   const id = orderItemOne.id;
  //   it("Should return 200 and successfully delete orderItem if orderItemId is valid", async () => {
  //     const res = await request(app)
  //       .delete(`/v1/orderItem/${id}`)
  //       .set("Authorization", `Bearer ${adminAccessToken}`)
  //       .expect(httpStatus.OK);
  //     expect(res.body).toEqual({
  //       status: true,
  //       statusCode: httpStatus.OK,
  //       message: expect.any(String),
  //       data: null,
  //     });
  //     const orderItemDb = await prisma.orderItem.findUnique({
  //       where: {
  //         id: id,
  //       },
  //     });
  //     expect(orderItemDb).toBeNull();
  //   });

  //   // it("should return 400 if orderItemId is invalid", async () => {
  //   //   const id = "invalid-order-id";
  //   //   await request(app)
  //   //     .delete(`/v1/orderItem/${id}`)
  //   //     .set("Authorization", `Bearer ${adminAccessToken}`)
  //   //     .expect(httpStatus.BAD_REQUEST);
  //   // });

  //   // it("should return 404 Not Found if no parameters are provided for delete", async () => {
  //   //   await request(app)
  //   //     .delete(`/v1/orderItem`)
  //   //     .set("Authorization", `Bearer ${adminAccessToken}`)
  //   //     .expect(httpStatus.NOT_FOUND);
  //   // });
  // });
});
