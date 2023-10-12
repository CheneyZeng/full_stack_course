const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");
let token;

const initialBlog = {
  title: "title",
  author: "me",
  url: "anything",
  likes: 3,
};

const initialUser = {
  username: "username",
  password: "password",
};

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const { username, password } = initialUser;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  let userObject = new User({
    username,
    passwordHash,
  });
  await userObject.save();
  const login = await api.post("/api/login").send(initialUser);
  token = login.body.token;

  let blogObject = new Blog({ user: userObject._id, ...initialBlog });
  await blogObject.save();
});

describe("test get API", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("blogs are returned has id", async () => {
    const test = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);
    expect(test.body[0].id).toBeDefined();
  }, 100000);
});

describe("test post API", () => {
  test("the blog is posted correctly", async () => {
    const data = {
      title: "title2",
      author: "me2",
      url: "anything2",
      likes: 6,
    };
    const test = await api
      .post("/api/blogs")
      .send(data)
      .set("Authorization", `Bearer ${token}`)
      .expect(201);
    expect(test.body).toEqual(expect.objectContaining(data));
  }, 100000);

  test("the blog is posted with default 0 likes", async () => {
    const data = {
      title: "title2",
      author: "me2",
      url: "anything2",
    };
    const test = await api
      .post("/api/blogs")
      .send(data)
      .set("Authorization", `Bearer ${token}`);
    expect(test.body).toEqual(expect.objectContaining({ likes: 0, ...data }));
  }, 100000);

  test("the blog is posted without title return 400", async () => {
    const data = {
      author: "me2",
      url: "anything2",
    };
    await api
      .post("/api/blogs")
      .send(data)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  }, 100000);

  test("the blog is posted without url return 400", async () => {
    const data = {
      title: "titile2",
      author: "me2",
    };
    await api
      .post("/api/blogs")
      .send(data)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  }, 100000);

  test("the blog is posted without token return 401", async () => {
    const data = {
      title: "titile2",
      author: "me2",
    };
    await api.post("/api/blogs").send(data).expect(401);
  }, 100000);
});

describe("test put API", () => {
  test("the blog is updated with id", async () => {
    const data = {
      likes: 6,
    };
    const blogs = await helper.blogsInDb();
    const test = await api
      .put(`/api/blogs/${blogs[0].id}`)
      .send(data)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(test.body.likes).toBe(data.likes);
  }, 100000);
});

describe("test delete API", () => {
  test("the blog is deleted with id", async () => {
    const blogs = await helper.blogsInDb();
    console.log(blogs);
    await api
      .delete(`/api/blogs/${blogs[0].id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
  }, 100000);
});

afterAll(async () => {
  await mongoose.connection.close();
});
