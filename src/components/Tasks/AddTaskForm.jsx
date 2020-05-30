import React, { useState } from "react";

import addSvg from "../../assets/img/add.svg";

function AddTaskForm({ list, onTaskAdd }) {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [taskName, setTaskName] = useState("");

  const addTask = () => {
    onTaskAdd(list.id, { id: 5, listId: 2, text: taskName, completed: true });
  };

  return (
    <div className="tasks__form">
      <div
        onClick={() => setVisiblePopup(!visiblePopup)}
        className="tasks__form-new"
      >
        <img src={addSvg} alt="Добавить"></img>
        <span>Новая Задача</span>
      </div>
      {visiblePopup && (
        <div className="tasks__form-add-block">
          <input
            className="field field--task"
            type="text"
            placeholder="Название задачи"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          ></input>
          <button onClick={addTask} className="button">
            Добавить задачу
          </button>
          <button className="button button--grey">Отмена</button>
        </div>
      )}
    </div>
  );
}

export default AddTaskForm;
