const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRoute = express.Router();
const fs = require("fs");

userRoute.post("/users", (req, res) => {
  let payload = req.body;
  let checkEmail = false;
  let userData = fs.readFileSync("./users.json", "utf-8") || [];
  userData = JSON.parse(userData);
  for (let i = 0; i < userData.length; i++) {
    if (userData[i].email == payload.email) {
      checkEmail = true;
    }
  }
  if (checkEmail) {
    res.status(400);
    res.send("email already exists");
  } else {
    bcrypt.hash(payload.password, 5, (err, hash) => {
      if (err) {
        console.log(err);
        res.send("something went wrong");
      } else {
        payload.password = hash;
        userData.push(payload);
        fs.writeFileSync("./users.json", JSON.stringify(userData), "utf-8");
        res.send("user registered");
      }
    });
  }
});

userRoute.post("/users/login", (req, res) => {
  let payload = req.body;
  let checkEmail = false;
  let data = {};
  let userData = fs.readFileSync("./users.json", "utf-8") || [];
  userData = JSON.parse(userData);
  for (let i = 0; i < userData.length; i++) {
    if (userData[i].email == payload.email) {
      checkEmail = true;
      data = userData[i];
    }
  }
  if (checkEmail) {
    bcrypt.compare(payload.password, data.password, (err, result) => {
      if (result) {
        let token = jwt.sign(
          { email: data.email, isDoctor: data.isDoctor },
          "mySecret"
        );
        res.send({ msg: "user registered", token: token });
      } else {
        res.status(400);
        res.send("something went wrong");
      }
    });
  } else {
    res.status(400);
    res.send("wrong credential");
  }
});

module.exports = { userRoute };


// {
//     "name":"monu",
//     "email":"monu@mail.com",
//     "password":"12345",
//     "isDoctor":"true"
// }