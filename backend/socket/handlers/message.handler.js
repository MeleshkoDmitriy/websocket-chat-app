import { findUser } from "../../database/index.js";

export const messageHandler = (socket, io, { message, params }) => {
  const { name, room } = params;
  const user = findUser({ name, room });

  if (!user) {
    return;
  }

  io.to(user.room).emit("message", {
    data: { user: user, message: message },
  });
};
