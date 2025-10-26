import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import { indexRouter } from "./routes/index.js";
import { setupSocketHandlers } from "./socket/index.js";
import { CONFIG } from "./config/index.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors(CONFIG.SERVER.CORS));

// Routes
app.use(indexRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: CONFIG.SOCKET.CORS,
});

// Setup Socket.IO handlers
setupSocketHandlers(io);

server.listen(CONFIG.SERVER.PORT, () => {
  console.log(`🔌 Server is running on port ${CONFIG.SERVER.PORT}`);
});
