import React from "react";
import "./Home.css";
const Home = () => {
  return (
    <div className="home d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-center">
          Организуйте вашу <br /> работу и жизнь.
        </h1>
        <p>
          Станьте сфокусированным, организованым, и спокойным с ToDo
          приложением. Приложение Todo — номер #1 в мире!
        </p>
        <button className="home-btn">Make ToDo list</button>
      </div>
    </div>
  );
};

export default Home;
