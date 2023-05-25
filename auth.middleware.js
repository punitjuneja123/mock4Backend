const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  let token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "mySecret", (err, decode) => {
      if (err) {
        res.status(400);
        res.send("invalid token");
      } else {
        req.body.email = decode.email;
        req.body.isDoctor = decode.isDoctor;
        next();
      }
    });
  } else {
    res.status(400);
    res.send("please provide a token");
  }
}

module.exports = { auth };
