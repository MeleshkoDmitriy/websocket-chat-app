import { useState } from "react";
import styles from "./HomePage.module.less";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants";

const initialFormState = {
  username: "",
  roomname: "",
};

export const HomePage = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState(initialFormState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate(
      `${ROUTES.CHAT}?username=${formState.username}&roomname=${formState.roomname}`
    );
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formState.username}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <input
          type="text"
          name="roomname"
          placeholder="Room name"
          value={formState.roomname}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <button>Sign In</button>
      </form>
    </div>
  );
};
