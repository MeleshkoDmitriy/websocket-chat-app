import type { TMessage } from "@/types";
import styles from "./styles.module.less";

interface MessageListProps {
  messages: TMessage[];
  username: string;
}

export const MessageList = ({ messages, username }: MessageListProps) => {
  return (
    <div>
      {messages.length > 0 &&
        messages.map((m, index) => {
          const isOwnMessage =
            m.user.name.trim().toLowerCase() === username.trim().toLowerCase();
          const dynamicClassName = isOwnMessage
            ? styles.ownMessage
            : styles.otherMessage;

          return (
            <div
              key={index}
              className={`${styles.message} ${dynamicClassName}`}
            >
              <p className={styles.messageUsername}>{m.user.name}</p>
              <span className={styles.messageText}>{m.message}</span>
            </div>
          );
        })}
    </div>
  );
};
