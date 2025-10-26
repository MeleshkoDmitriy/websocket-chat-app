import styles from "./styles.module.less";
import { SiSocketdotio } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { FaReact } from "react-icons/fa";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>Web Socket Chat</h1>
        <div className={styles.logoContainer}>
          <SiSocketdotio size={24} className={styles.logo} />
          <FaNodeJs size={24} className={styles.logo} />
          <FaReact size={24} className={styles.logo} />
        </div>
      </div>
    </header>
  );
};
