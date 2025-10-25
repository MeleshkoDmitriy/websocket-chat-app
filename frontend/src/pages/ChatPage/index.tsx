import io from "socket.io-client";
import { API, ROUTES } from "@/constants";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import type { EmojiClickData } from "emoji-picker-react";
import type { TMessage, TUser } from "@/types";
import { MessageList } from "@/components";

const socket = io(API.SOCKET);

export const ChatPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [params, setParams] = useState({ name: "", room: "" } as {
    name: string;
    room: string;
  });
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [roomUsers, setRoomUsers] = useState<TUser[]>([]);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams({ name: searchParams.name || "", room: searchParams.room || "" });

    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      setMessages(prev => [...prev, data]);
    });
  }, []);

  useEffect(() => {
    socket.on("room_users", ({ data: { users } }) => {
      setRoomUsers(users);
    });
  }, []);

  const handleLeaveRoom = () => {
    socket.emit("leave_room", {
      params,
    });
    
    navigate(ROUTES.HOME);
  };

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(value);
  };

  const onIconClick = () => {
    setShowEmojiPicker(prev => !prev);
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessage(message + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim() === "") {
      alert("Please enter a message");
      return;
    }

    socket.emit("send_message", {
      message,
      params,
    });

    setMessage("");
  };

  return (
    <div>
      <div>
        <p>
          Room: {params?.room || ""} | Users in this room: {roomUsers.length}
        </p>
        <h1>Chat Page</h1>
        <button onClick={handleLeaveRoom}>Leave Room</button>
      </div>
      <MessageList messages={messages} username={params?.name || ""} />
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='message'
          value={message}
          onChange={handleChange}
          placeholder='Enter your message'
          autoComplete='off'
          required
        />
        <div>
          <FaSmile size={20} onClick={onIconClick} />
          {showEmojiPicker && <EmojiPicker onEmojiClick={onEmojiClick} />}
        </div>

        <button type='submit'>Send</button>
      </form>
    </div>
  );
};
