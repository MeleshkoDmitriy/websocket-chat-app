import { SOCKET_EVENTS } from "./events.js";
import { 
  joinHandler, 
  messageHandler, 
  leaveRoomHandler, 
  disconnectHandler, 
  roomUsersHandler 
} from "./handlers/index.js";

export const setupSocketHandlers = (io) => {
  io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
    socket.on(SOCKET_EVENTS.JOIN, (data) => joinHandler(socket, io, data));
    socket.on(SOCKET_EVENTS.SEND_MESSAGE, (data) => messageHandler(socket, io, data));
    socket.on(SOCKET_EVENTS.LEAVE_ROOM, (data) => leaveRoomHandler(socket, io, data));
    socket.on(SOCKET_EVENTS.DISCONNECT, () => disconnectHandler(socket, io));
    socket.on(SOCKET_EVENTS.ROOM_USERS, (data) => roomUsersHandler(socket, io, data));
  });
};