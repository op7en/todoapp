import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Update = ({ display, update, refetch }) => {
  const [Inputs, setInputs] = useState({ title: "", body: "" });

  useEffect(() => {
    if (update) {
      setInputs({ title: update.title, body: update.body });
    }
  }, [update]);

  const change = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-5 bg-primary d-flex justify-content-center align-items-start flex-column update">
      <h3>Обновите ваше задание</h3>
      <input
        type="text"
        name="title"
        className="todo-inputs my-4 w-100 p-3"
        value={Inputs.title}
        onChange={change}
      />
      <textarea
        name="body"
        className="todo-inputs w-100"
        value={Inputs.body}
        onChange={change}
      />
      <div>
        <button
          className="btn btn-dark my-4"
          onClick={async () => {
            const email = sessionStorage.getItem("email");
            await axios.put(
              `https://todoapp-9xbj.vercel.app//api/v2/updateTask/${update._id}`,
              {
                title: Inputs.title,
                body: Inputs.body,
                email: email,
              },
            );
            toast.success("Задание обновлено!");
            refetch(); // ✅ added here
            display("none");
          }}
        >
          Обновить
        </button>
        <button
          className="btn btn-danger my-4 mx-3"
          onClick={() => display("none")}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default Update;
