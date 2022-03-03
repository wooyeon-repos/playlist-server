const { connection } = require("../../server");
// constructor
const User = function (user) {
  this.name = user.name;
  this.user_id = user.user_id;
  this.password = user.password;
};
User.create = (newUser, result) => {
  console.log("model", newUser);
  connection.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    console.log("created user: ", { user_id: res.insertId, ...newUser });
    result(null, { user_id: res.insertId, ...newUser });
  });
};
User.findById = (id, result) => {
  connection.query(`SELECT * FROM users WHERE user_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.updateById = (id, user, result) => {
  connection.query(
    "UPDATE users SET name = ?, user_id = ?, password = ? WHERE user_id = ?",
    [user.name, user.user_id, user.password, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated user: ", { user_id: id, ...user });
      result(null, { user_d: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  connection.query("DELETE FROM users WHERE user_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted user with user_id: ", id);
    result(null, res);
  });
};

module.exports = User;
