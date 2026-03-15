import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/index";
const Singin = () => {
  const dispatch = useDispatch();
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const change = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const history = useNavigate();
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://todoapp-9xbj.vercel.app/api/v1/signin",
        Inputs,
      );
      alert("Вход выполнен успешно!");
      sessionStorage.setItem("id", response.data.others._id);
      sessionStorage.setItem("email", response.data.others.email);
      dispatch(authActions.login());
      history("/todo");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Что то пошло не так");
    }
    setLoading(false);
  };
  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 column col-left  d-flex justify-content-center align-items-center ">
            <h1 className="text-center sign-up-heading">Войти</h1>
          </div>
          <div className="col-lg-8 column d-flex justify-content-center align-items-center ">
            <div className="d-flex flex-column w-100 p-5 ">
              <input
                className="p-2 my-3 input-signup"
                type="email"
                name="email"
                placeholder="Введите вашу электронную почту"
                value={Inputs.email}
                onChange={change}
              />
              <input
                className="p-2 my-3 input-signup"
                type="password"
                name="password"
                placeholder="Введите ваш пароль"
                value={Inputs.password}
                onChange={change}
              />
              <button
                className="btn-signup p-2"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Загрузка..." : "Войти"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singin;
