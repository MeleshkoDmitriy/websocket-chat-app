import { trimString } from "../utils/index.js";

export let users = [];

export const findUser = (user) => {
  const userName = trimString(user.name);
  const roomName = trimString(user.room);

  return users.find(
    (u) => trimString(u.name) === userName && trimString(u.room) === roomName
  );
};

export const addUser = (user) => {
  const isExist = findUser(user);

  !isExist && users.push(user);

  const currentUser = isExist ?? user;

  return {
    isExist: !!isExist,
    user: currentUser,
  };
};

export const getRoomUsers = (room) => {
  return users.filter((user) => user.room === room);
};

export const removeUser = (user) => {
  const foundUser = findUser(user);

  if (foundUser) {
    users = users.filter(({ room, name }) => room !== foundUser.room && name !== foundUser.name);
  }

  return foundUser;
};  
