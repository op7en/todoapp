import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const history = useNavigate();
  return (
    <div className="home d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-center home-title">
          Организуйте вашу <br /> работу и жизнь.
        </h1>
        <p className="home-subtitle text-center">
          Станьте сфокусированным, организованным и спокойным с ToDo
          приложением. Создавайте, редактируйте и удаляйте задачи в любое время.
        </p>
        <div className="d-flex gap-3">
          <button
            className="home-btn px-4 py-2"
            onClick={() => history("/signup")}
          >
            Начать бесплатно
          </button>
          <button
            className="home-btn-outline px-4 py-2"
            onClick={() => history("/signin")}
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
