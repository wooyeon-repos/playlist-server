module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  // var router = require("express")();
  // Create a new user
  app.post("/users", users.create);
  // Retrieve all users
  app.get("/users", users.findOne);

  // Update a user with id
  app.put("/users", users.update);
  // Delete a user with id
  app.delete("/users", users.delete);
};
