const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const { userRoute } = require("./routes/user.routes");
const { appointmentRoute } = require("./routes/appointment.route");
const { auth } = require("./auth.middleware");

app.get("/", (req, res) => {
  res.send("welcome to masai hospital");
});

app.use(userRoute);
app.use(auth);
app.use(appointmentRoute);

app.listen(4500, () => {
  console.log("server running at port 4500");
});
