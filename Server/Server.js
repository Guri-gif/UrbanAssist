const mdb = require("mongoose");
require("dotenv").config();
const express = require("express");
const backend = express();
const http = require("http").Server(backend);
const cors = require("cors");
const router = require("./Routes/api/Auth.route");

backend.use(express.json());

backend.use(cors({ origin: "*", credentials: true }));

backend.use("/api/auth", router);

mdb
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    const PORT = 5000;
    const HOST = '0.0.0.0';
    http.listen(PORT,HOST, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });
  });
