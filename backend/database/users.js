import { trimString } from "../utils/index.js";

export let users = [];


export const addUser = (user) => {
  const userName = trimString(user.name);
  const roomName = trimString(user.room);

  const isExist = users.find((u) => (trimString(u.name) === userName && trimString(u.room) === roomName));

  !isExist && users.push(user);

  const currentUser = isExist ?? user;

  return {
    isExist: !!isExist,
    user: currentUser,
  }
}