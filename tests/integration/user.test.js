const request = require("supertest");
const httpStatus = require("http-status");
const app = require("../../src/app");
const {
  userOne,
  admin,
  insertUsers,
  newUser,
  userTwo,
} = require("../fixtures/user.fixture");
const {
  userOneAccessToken,
  adminAccessToken,
} = require("../fixtures/token.fixture");
const prisma = require("../../prisma");

describe("User routes", () => {
  describe("GET /v1/user", () => {
    beforeEach(async () => {
      await insertUsers([admin, userOne]);
    });
    it("should return 200 and successfully retrieve users if query is ok", async () => {
      const res = await request(app)
        .get("/v1/user")
        .query({ page: 1, limit: 10 })
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.OK);
      expect(res.body).toEqual({
        status: true,
        statusCode: httpStatus.OK,
        message: expect.any(String),
        data: expect.arrayContaining([]),
      });
    });
    it("should return 400 if query parameters are invalid", async () => {
      const res = await request(app)
        .get("/v1/user")
        .query({ page: 0, limit: 0 })
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
      expect(res.body).toEqual({
        status: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: expect.any(String),
        data: {},
      });
    });
  });

  describe("GET /v1/user/:id", () => {
    beforeEach(async () => {
      await insertUsers([admin, userOne]);
    });
    const id = userOne.id;

    it("should return 200 and successfully retrieve users if query is ok", async () => {
      const res = await request(app)
        .get(`/v1/user/${id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: true,
        statusCode: httpStatus.OK,
        message: expect.any(String),
        data: expect.objectContaining({}),
      });
    });
    it("should return 400 if userId is invalid", async () => {
      const id = "invalidId";
      await request(app)
        .get(`/v1/user/${id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("POST /v1/user", () => {
    beforeEach(async () => {
      await insertUsers([admin]);
    });
    it("should return 201 and successfully create user if request data is ok", async () => {
      const res = await request(app)
        .post("/v1/user")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.CREATED);
      const userData = res.body.data;
      expect(res.body).toEqual({
        status: true,
        statusCode: httpStatus.CREATED,
        message: expect.any(String),
        data: {
          id: expect.anything(),
          name: newUser.name,
          email: newUser.email,
          password: expect.anything(),
          role: "user",
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
          isEmailVerified: false,
        },
      });
      const dbUser = await prisma.user.findUnique({
        where: {
          id: userData.id,
        },
      });
      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(newUser.password);
      expect(dbUser).toMatchObject({
        id: expect.anything(),
        name: newUser.name,
        email: newUser.email,
        password: expect.anything(),
        role: "user",
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
        isEmailVerified: false,
      });
    });
    it("should return 400 if request data is empty", async () => {
      await request(app)
        .post("/v1/user")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send({})
        .expect(httpStatus.BAD_REQUEST);
    });
    it("should return 400 if request create email data is invalid", async () => {
      const createUserEmailInvalid = {
        name: "update",
        email: "not-email",
        password: "password1",
        role: "user",
      };
      await request(app)
        .post(`/v1/user`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(createUserEmailInvalid)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("PUT /v1/user/:userId", () => {
    beforeEach(async () => {
      await insertUsers([admin, userOne]);
    });
    const updateUser = {
      name: "update",
      email: "update@gmail.com",
      password: "password1",
      role: "user",
    };
    const id = userOne.id;
    it("should return 200 and successfully update user if userId and request data are valid", async () => {
      const res = await request(app)
        .put(`/v1/user/${id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updateUser)
        .expect(httpStatus.OK);
      expect(res.body).toEqual({
        status: true,
        statusCode: httpStatus.OK,
        message: expect.any(String),
        data: {
          id: expect.anything(),
          name: updateUser.name,
          email: updateUser.email,
          password: expect.anything(),
          role: "user",
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
          isEmailVerified: false,
        },
      });
      const dbUser = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(updateUser.password);
      expect(dbUser).toMatchObject({
        id: expect.anything(),
        name: updateUser.name,
        email: updateUser.email,
        password: expect.anything(),
        role: "user",
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
        isEmailVerified: false,
      });
    });
    it("should return 400 if request input update data is empty", async () => {
      await request(app)
        .put(`/v1/user/${id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send({})
        .expect(httpStatus.BAD_REQUEST);
    });
    it("should return 400 if request update email data is invalid", async () => {
      await request(app)
        .put(`/v1/user/${id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send({ email: "not-email" })
        .expect(httpStatus.BAD_REQUEST);
    });
    it('should return 400 if role is not "user" or "admin"', async () => {
      await request(app)
        .put(`/v1/user/${id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send({ role: "bukan admin / user" })
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("DELETE /v1/user", () => {
    beforeEach(async () => {
      await insertUsers([admin, userOne]);
    });
    it("Should return 200 and successfully delete user if userId is valid", async () => {
      const id = userOne.id;
      const res = await request(app)
        .delete(`/v1/user/${id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.OK);
      expect(res.body).toEqual({
        status: true,
        statusCode: httpStatus.OK,
        message: expect.any(String),
        data: expect.objectContaining({}),
      });
      const userDb = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      expect(userDb).toBeNull();
    });
    it("should return 400 if userId is invalid", async () => {
      const id = "invalidId";
      await request(app)
        .delete(`/v1/user/${id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
});
