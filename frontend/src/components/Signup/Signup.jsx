import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const history = useNavigate();

  const [Inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Inputs.password !== Inputs.confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }
    try {
      const response = await axios.post(
        "https://todoapp-9xbj.vercel.app/api/v1/register",
        Inputs,
      );
      alert(response.data.message); // ← now clearly visible
      setInputs({ email: "", username: "", password: "", confirmPassword: "" });
      history("/signin");
    } catch (err) {
      console.log(err.response.data);
      alert(err.response?.data?.message || "Что то пошло не так");
    }
  };
  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center ">
            <div className="d-flex flex-column w-100 p-5 ">
              <input
                className="p-2 my-3 input-signup"
                type="email"
                name="email"
                placeholder="Enter Your Email"
                onChange={change}
                value={Inputs.email}
                required
              />
              <input
                className="p-2 my-3 input-signup"
                type="username"
                name="username"
                placeholder="Enter Your Username"
                onChange={change}
                value={Inputs.username}
                required
              />
              <input
                className="p-2 my-3 input-signup"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={change}
                value={Inputs.password}
                required
              />
              <input
                className="p-2 my-3 input-signup"
                type="password"
                name="confirmPassword"
                placeholder="Repeat Your Password"
                onChange={change}
                value={Inputs.confirmPassword}
                required
              />
              <button className="btn-signup p-2" onClick={handleSubmit}>
                Зарегистрироваться
              </button>
            </div>
          </div>

          <div className="col-lg-4 column col-left  d-flex justify-content-center align-items-center ">
            <h1 className="text-center sign-up-heading">Регистрация</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
