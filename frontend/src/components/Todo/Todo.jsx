import React, { useEffect, useState } from "react";
import "./Todo.css";
import TodoCards from "./TodoCards";
import Update from "./Update";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Todo = () => {
  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const update = (index) => {
    const id = sessionStorage.getItem("id");
    if (id) {
      setSelectedTodo(todos[index]);
      dis("block");
    } else {
      toast.error("Пожалуйста авторизуйтесь");
    }
  };
  const fetchTodos = async () => {
    const id = sessionStorage.getItem("id");
    if (!id) return; // ✅ stop if not logged in
    const response = await axios.get(
      `https://todoapp-9xbj.vercel.app/api/v2/getTasks/${id}`,
    );
    setTodos(response.data.list);
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) {
      const fetch = async () => {
        await axios
          .get(`https://todoapp-9xbj.vercel.app/api/v2/getTasks/${id}`)
          .then((response) => {
            setTodos(response.data.list); // ✅ change response.data to response.data.list
            console.log(response.data.list);
          });
      };
      fetch();
    }
  }, []);
  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const submit = async () => {
    const id = sessionStorage.getItem("id");

    if (Inputs.title === "" || Inputs.body === "") {
      toast.error("Название и текст должны быть заполнены");
    } else {
      if (id) {
        await axios
          .post("https://todoapp-9xbj.vercel.app/api/v2/addTask", {
            title: Inputs.title,
            body: Inputs.body,
            id: id,
          })
          .then((response) => {
            console.log(response);
          });
        setTodos([...todos, Inputs]); // ✅ was setArray([...Array, Inputs])
        setInputs({ title: "", body: "" });
        toast.success("Ваше задание добавлено");
      } else {
        setTodos([...todos, Inputs]); // ✅ was setArray([...Array, Inputs])
        setInputs({ title: "", body: "" });
        toast.success("Ваше задание добавлено");
        toast.error("Войдите или зарегистрируйтесь!");
      }
    }
  };
  // ✅ Correct
  const del = async (Cardid) => {
    const id = sessionStorage.getItem("id");
    if (id) {
      await axios
        .delete(`https://todoapp-9xbj.vercel.app/api/v2/deleteTask/${Cardid}`, {
          data: { id: id },
        })
        .then((response) => {
          console.log(response.data);
          setTodos(todos.filter((item) => item._id !== Cardid)); // remove from UI too
          toast.success("Ваше задание удалено.");
        });
    } else {
      toast.error("Пожалуйста авторизуйтесь");
    }
  };
  const dis = (value) => {
    document.getElementById("todo-update").style.display =
      value === "block" ? "flex" : "none";
  };
  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-content-center my-4 flex-column">
          <div className="d-flex flex-column todo-inputs-div w-50 p-1">
            <input
              type="text"
              placeholder="Название"
              className="my-2 p-2 todo-inputs"
              onClick={show}
              name="title"
              value={Inputs.title}
              onChange={change}
            />
            <textarea
              id="textarea"
              type="text/"
              placeholder="Текст"
              name="body"
              value={Inputs.body}
              className="p-2 todo-inputs"
              onChange={change}
            />
          </div>
          <div className="w-50 d-flex justify-content-end my-3">
            <button className="home-btn px-2 py-1" onClick={submit}>
              Добавить
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {todos &&
                todos.map((item, index) => (
                  <div className="col-lg-4 col-10 my-2" key={index}>
                    <TodoCards
                      title={item.title}
                      body={item.body}
                      id={item._id}
                      delid={del}
                      dis={dis}
                      updateId={index}
                      toBeUpdate={update}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update" id="todo-update">
        <div className="container">
          {" "}
          <Update display={dis} update={selectedTodo} refetch={fetchTodos} />
        </div>
      </div>
    </>
  );
};

export default Todo;
