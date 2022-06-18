import React from "react";
import "../CssFolder/Card.css";

function Card({ title, brief, priority, onDelete, onUpdate }) {
  return (
    <div className="CardContainer">
      <div className="CardCont1">
        <h3>{title}</h3>
        <h5>{brief}</h5>
        <h6>{priority}</h6>
      </div>
      <div className="CardCont2">
        <button onClick={onDelete} className="BTNDelete">
          Delete
        </button>
        <button onClick={onUpdate} className="BTNUpdate">
          Update
        </button>
      </div>
    </div>
  );
}

export default Card;
