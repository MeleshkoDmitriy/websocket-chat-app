import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import { indexRouter } from "./routes/index.js";
import { addUser, findUser, getRoomUsers } from "./database/index.js";

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

    const botMessage = isExist
      ? `${user.name} has joined the chat`
      : `Welcome to the chat ${user.name}`;

    socket.emit("message", {
      data: {
        user: { name: "🤖 ChatBot" },
        message: botMessage,
      },
    });

    socket.broadcast.to(user.room).emit("message", {
      data: {
        user: { name: "🤖 ChatBot" },
        message: `${user.name} has joined the chat`,
      },
    });

    io.to(user.room).emit("join_room", {
      data: {
        users: getRoomUsers(user.room),
      },
    });
  });

  socket.on("send_message", ({ message, params }) => {
    const { name, room } = params;

    const user = findUser({ name, room });

    if (!user) {
      return;
    }

    io.to(user.room).emit("message", {
      data: { user: user, message: message },
    });
  });

  io.on("disconnect", () => {
    console.log("🔴 User disconnected");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🔌 Server is running on port ${PORT}`);
});
