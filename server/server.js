const express = require("express");
require("dotenv").config();
const dbConnection = require("./config/dbConnect");
const initRouter = require("./routers");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dbConnection();
initRouter(app);

app.use("/", (rep, res) => {
  res.send("Server on...");
});

app.listen(port, () => {
  console.log("Server running on the port: ", port);
});
