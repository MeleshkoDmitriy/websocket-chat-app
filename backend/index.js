import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import { indexRouter } from "./routes/index.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "*"}));

// Routes
app.use("/", indexRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 6000;

server.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});