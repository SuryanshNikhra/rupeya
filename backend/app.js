const express = require("express");
const cors = require("cors");
const db = require("./db/db");
const { readdirSync } = require("fs");

require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

//routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

const server = () => {
  app.listen(PORT, (req, res) => {
    db();
    console.log(`server is running on port ${PORT}`);
  });
};
server();
