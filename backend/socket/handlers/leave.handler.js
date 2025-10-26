import { removeUser, getRoomUsers } from "../../database/index.js";
import { NAMES } from "../../constants/index.js";

export const leaveRoomHandler = (socket, io, { params }) => {
  const user = removeUser(params);

  if (user) {
    const { name, room } = user;
    const botMessage = `${name} has left the chat`;

    io.to(room).emit("message", {
      data: { user: { name: NAMES.BOT }, message: botMessage },
    });

    io.to(room).emit("room_users", {
      data: {
        users: getRoomUsers(room),
      },
    });
  }
};
