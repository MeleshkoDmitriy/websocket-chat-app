import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import { indexRouter } from "./routes/index.js";
import { addUser, findUser } from "./database/index.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "*" }));

// Routes
app.use("/", indexRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`🔗 A user connected: ${socket.id}`);

  socket.on("join", ({ username, roomname }) => {
    console.log(`🔗 A user joined the room: ${username} in ${roomname}`);
    socket.join(roomname);

    const { user } = addUser({ username, roomname });

    socket.emit("message", {
      data: {
        user: "Admin",
        message: `${user.username} joined the room`,
      },
    });

    socket.broadcast.to(roomname).emit("message", {
      data: {
        user: "Admin",
        message: `${user.username} joined the room`,
      },
    });
  });

  socket.on("send_message", ({ message, username, roomname }) => {
    const user = findUser({ username, roomname });

    if (!user) {
      return;
    }

    io.to(roomname).emit("message", {
      data: {
        user: username,
        message,
      },
    });
  });

  io.on("disconnect", (socket) => {
    console.log(`❌ A user disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 1337;

server.listen(PORT, () => {
  console.log(`🔌 Server is running on port ${PORT}`);
});
