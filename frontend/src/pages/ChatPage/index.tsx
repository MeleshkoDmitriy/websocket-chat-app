import io from "socket.io-client";
import { API } from "@/constants";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import type { EmojiClickData } from "emoji-picker-react";
import type { TMessage } from "@/types";
import { MessageList } from "@/components";

const socket = io(API.SOCKET);

export const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("join", {
        username: searchParams.get("username"),
        roomname: searchParams.get("roomname"),
      });
    });
  }, [searchParams]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      setMessages((prev) => ({ ...prev, data }));
    });
  }, []);

  console.log(messages);

  const handleLeaveRoom = () => {
    // socket.emit("leave", {
    //   username: searchParams.get("username"),
    //   roomname: searchParams.get("roomname"),
    // });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onIconClick = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessage(message + emojiData.emoji);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === "") return;

    socket.emit("send_message", {
      message,
      username: searchParams.get("username") || "",
      roomname: searchParams.get("roomname") || "",
    });

    setMessage("");
  };

  return (
    <div>
      <h1>Chat Page</h1>
      <button onClick={handleLeaveRoom}>Leave Room</button>
      <MessageList
        messages={messages}
        username={searchParams.get("username") || ""}
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          value={message}
          onChange={handleChange}
          placeholder="Enter your message"
          autoComplete="off"
          required
        />
        <div>
          <FaSmile size={20} onClick={onIconClick} />
          {showEmojiPicker && <EmojiPicker onEmojiClick={onEmojiClick} />}
        </div>

        <button type="submit">Send</button>
      </form>
    </div>
  );
};
