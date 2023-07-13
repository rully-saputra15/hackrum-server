require("dotenv").config();

const express = require("express");

const cors = require("cors");
const router = require("./routers");
const errorHandler = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
