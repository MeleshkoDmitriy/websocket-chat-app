import { useState } from "react";
import styles from "./styles.module.less";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants";

const FIELDS = {
  NAME: "name",
  ROOM: "room",
};

export const HomePage = () => {
  const navigate = useNavigate();
  const { NAME, ROOM } = FIELDS;
  const [formState, setFormState] = useState({
    [NAME]: "",
    [ROOM]: "",
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("formState:", formState);

    navigate(`${ROUTES.CHAT}?name=${formState[NAME]}&room=${formState[ROOM]}`);
    setFormState({ [NAME]: "", [ROOM]: "" });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={formState[NAME]}
          onChange={handleChange}
          autoComplete='off'
          required
        />
        <input
          type='text'
          name='room'
          placeholder='Room'
          value={formState[ROOM]}
          onChange={handleChange}
          autoComplete='off'
          required
        />
        <button type='submit'>Join Room</button>
      </form>
    </div>
  );
};
