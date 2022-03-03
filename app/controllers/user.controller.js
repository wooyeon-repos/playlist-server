const User = require("../models/user.model.js");
const crypto = require("crypto");

exports.create = (req, res) => {
  console.log("controller", req.body);
  // 회원가입
  console.log("route: post", req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // encryption
  // const encrypt = (target) => {
  //   const algorithm = "aes-256-cbc";
  //   const ENCRYPTION_KEY = "abcd";
  //   const IV_LENGTH = 16;
  //   let iv = crypto.randomBytes(IV_LENGTH);
  //   let cipher = crypto.createCipheriv(
  //     algorithm,
  //     Buffer.from(ENCRYPTION_KEY, "hex"),
  //     iv
  //   );
  //   let encrypted = cipher.update(target);
  //   encrypted = Buffer.concat([encrypted, cipher.final()]);
  //   return iv.toString("hex") + ":" + encrypted.toString("hex");
  // };

  const user = new User({
    user_id: req.body.user_id,
    // password: encrypt(req.body.password),
    password: req.body.password,
    name: req.body.name || "",
  });

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  console.log("route: get", req);

  // decryption

  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with user_id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with user_id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log(req.body);
  const cipher = crypto.createCipher("aes-256-cbc", "열쇠");
  let encryptedPassword = cipher.update(req.body.password, "utf8", "base64");
  encryptedPassword += cipher.final("base64");
  User.updateById(
    req.params.id,
    new User({
      user_id: req.body.id,
      password: encryptedPassword,
      name: req.body.name || "",
    }),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with user_id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating User with user_id " + req.params.id,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with user_id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with user_id " + req.params.id,
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};
