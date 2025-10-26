import { getRoomUsers } from "../../database/index.js";

export const roomUsersHandler = (socket, io, { room }) => {
  const users = getRoomUsers(room);
  
  socket.emit("room_users", {
    data: { users },
  });
};
