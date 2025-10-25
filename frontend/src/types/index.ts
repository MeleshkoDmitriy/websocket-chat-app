export type TUser = {
  name: string;
  room?: string;
}

export type TMessage = {
  user: TUser;
  message: string;
}