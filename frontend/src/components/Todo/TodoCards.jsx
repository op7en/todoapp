import React, { useState } from "react";
import "./Todo.css";
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";

const TodoCards = ({ title, body, id, delid, dis, updateId, toBeUpdate }) => {
  const [delLoading, setDelLoading] = useState(false);

  return (
    <div className="p-3 todo-card">
      <div>
        <h5>{title}</h5>
        <p className="todo-card-p">{body.split("", 77)}...</p>
      </div>
      <div className="d-flex justify-content-around">
        <div
          className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1"
          onClick={() => {
            dis("block");
            toBeUpdate(updateId);
          }}
          style={{ cursor: "pointer" }}
        >
          <GrDocumentUpdate className="card-icons" />
          Update
        </div>
        <div
          className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1 text-danger"
          style={{
            opacity: delLoading ? 0.5 : 1,
            cursor: delLoading ? "not-allowed" : "pointer",
          }}
          onClick={async () => {
            if (delLoading) return;
            setDelLoading(true);
            await delid(id);
            setDelLoading(false);
          }}
        >
          <AiFillDelete className="card-icons del" />
          {delLoading ? "..." : "Delete"}
        </div>
      </div>
    </div>
  );
};

export default TodoCards;
