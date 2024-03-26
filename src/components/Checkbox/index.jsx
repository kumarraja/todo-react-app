import React from "react";

function Checkbox({ id, isCompleted, onClick, label }) {
  return (
    <div className="c-cb">
      <input type="checkbox" id={id} checked={isCompleted} onClick={onClick} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default Checkbox;
