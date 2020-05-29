import React from "react";

import addSvg from "../../assets/img/add.svg";

function AddTaskForm() {
  return (
    <div className="tasks__form">
      <div className="tasks__form-new">
        <img src={addSvg} alt="Добавить"></img>
        <span>Новая Задача</span>
      </div>
    </div>
  );
}

export default AddTaskForm;
