const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    author: 1,
    title: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  if (!username || !password || username.length < 3 || password.length < 3) {
    return response.status(400).json({ error: "invalid user info" });
  }

  const find = await User.find({ username });
  if (find.length > 0) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
