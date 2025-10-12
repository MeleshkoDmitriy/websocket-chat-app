import { trimString } from "../utils/index.js";

export let users = [];

export const findUser = (user) => {
  const userName = trimString(user.username);
  const roomName = trimString(user.roomname);

  return users.find(
    (u) => trimString(u.roomname) === roomName && trimString(u.username) === userName
  );
}

export const addUser = (user) => {
  const isExistingUser = findUser(user);

  !isExistingUser && users.push(user);

  const currentUser = isExistingUser ? isExistingUser : user;

  return { isExistingUser: !!isExistingUser, user: currentUser };
};
