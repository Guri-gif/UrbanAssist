const mdb = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const express = require("express");
const backend = express();
const http = require("http").Server(backend);

// const http = express()

backend.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

mdb
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    const PORT = 5000;
    http.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });


  // {api/locationAttributes/continent}