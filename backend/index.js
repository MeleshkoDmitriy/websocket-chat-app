import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import { indexRouter } from "./routes/index.js";
import { addUser } from "./database/index.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "*" }));

// Routes
app.use(indexRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }) => {
    socket.join(room);

    const { isExist, user } = addUser({ name, room });

    socket.emit("message", {
      data: {
        user: { name: "🤖 ChatBot" },
        message: `Welcome to the chat ${user.name}`,
      },
    });

    socket.broadcast.to(user.room).emit("message", {
      data: {
        user: { name: "🤖 ChatBot" },
        message: `${user.name} has joined the chat`,
      },
    });
  });

  socket.on("send_message", ({ massage, params }) => {
    const { name, room } = params;
  });

  io.on("disconnect", () => {
    console.log("🔴 User disconnected");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🔌 Server is running on port ${PORT}`);
});
