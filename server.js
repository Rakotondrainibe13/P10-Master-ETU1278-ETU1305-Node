const express = require("express");
const app = express();
const port = 333;
app.use(express.json());

const cors = require("cors");
app.use(cors());
app.use("/user", require("./routes/user"));
require("./db/connection");
require('dotenv').config();

app.listen(port, () => {
  console.log("SERVER is running on port: ".concat(port));
});
