const mdb = require("mongoose");
require("dotenv").config();
const express = require("express");
const backend = express();
const http = require("http").Server(backend); // Create HTTP server
const cors = require("cors");
const router = require("./Routes/api/Auth.route");
const socketIo = require("socket.io"); // Import socket.io

// Initialize Socket.IO
const io = socketIo(http, {
  cors: {
    origin: "*", // Allow all origins (you can restrict this for security later)
    methods: ["GET", "POST"],
    credentials: true,
  },
});

backend.use(express.json());
backend.use(cors({ origin: "*", credentials: true }));
backend.use("/api/auth", router);

// MongoDB connection
mdb
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    const PORT = 5000;
    const HOST = "0.0.0.0";

    // Start the HTTP server
    http.listen(PORT, HOST, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });
  });

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  // Optionally, listen for events like "new-booking"
  socket.on("new-booking", (data) => {
    console.log("New booking received:", data);
    // Broadcast this to all connected clients (e.g., service providers)
    io.emit("new-booking", data); // Emit the event to all clients
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
