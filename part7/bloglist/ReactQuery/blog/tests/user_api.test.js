const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const User = require("../models/user");

const initialUsers = [
  {
    username: "username",
    password: "password",
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  let userObject = new User(initialUsers[0]);
  await userObject.save();
});

describe("test post API", () => {
  test("users are returned as json", async () => {
    await api
      .post("/api/users")
      .send({
        username: "username1",
        password: "password",
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("users failed with short username", async () => {
    const data = await api
      .post("/api/users")
      .send({
        username: "u",
        password: "p",
      })
      .expect(400);
    expect(data.body).toEqual(
      expect.objectContaining({ error: "invalid user info" }),
    );
  }, 100000);

  test("users failed with same username", async () => {
    const data = await api
      .post("/api/users")
      .send({
        username: "username",
        password: "password",
      })
      .expect(400);
    expect(data.body).toEqual(
      expect.objectContaining({ error: "name must be unique" }),
    );
  }, 100000);
});

afterAll(async () => {
  await mongoose.connection.close();
});
