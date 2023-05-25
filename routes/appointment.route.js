const express = require("express");
const fs = require("fs");

const appointmentRoute = express.Router();
appointmentRoute.get("/checkAuth", (req, res) => {
  if (req.body.isDoctor) {
    res.send("Authorized");
  } else {
    res.status(400);
    req.send("you are not authorize");
  }
});

appointmentRoute.get("/appointments", (req, res) => {
  if (req.body.isDoctor) {
    let appointmentData =
      fs.readFileSync("./docappointments.json", "utf-8") || [];
    appointmentData = JSON.parse(appointmentData);
    res.send(appointmentData);
  } else {
    res.status(400);
    req.send("you are not authorize");
  }
});

appointmentRoute.post("/appointments", (req, res) => {
  let payload = req.body;
  if (req.body.isDoctor) {
    let appointmentData =
      fs.readFileSync("./docappointments.json", "utf-8") || [];
    appointmentData = JSON.parse(appointmentData);
    appointmentData.push(payload);
    fs.writeFileSync(
      "./docappointments.json",
      JSON.stringify(appointmentData),
      "utf-8"
    );
    res.send("appointment done");
  } else {
    res.status(400);
    res.send("you are not authorized");
  }
});

module.exports = { appointmentRoute };
