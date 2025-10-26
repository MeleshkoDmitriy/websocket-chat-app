import { addUser, getRoomUsers } from "../../database/index.js";
import { NAMES } from "../../constants/index.js";

export const joinHandler = (socket, io, { name, room }) => {
  socket.join(room);

  const { isExist, user } = addUser({ name, room });

  const botMessage = isExist
    ? `${user.name} has joined the chat`
    : `Welcome to the chat ${user.name}`;

  socket.emit("message", {
    data: {
      user: { name: NAMES.BOT },
      message: botMessage,
    },
  });

  socket.broadcast.to(user.room).emit("message", {
    data: {
      user: { name: NAMES.BOT },
      message: `${user.name} has joined the chat`,
    },
  });

  io.to(user.room).emit("room_users", {
    data: {
      users: getRoomUsers(user.room),
    },
  });
};