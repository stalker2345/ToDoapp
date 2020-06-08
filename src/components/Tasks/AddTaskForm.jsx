import React, { useState } from "react";

import addSvg from "../../assets/img/add.svg";

import axios from "axios";

function AddTaskForm({ list, onTaskAdd }) {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [isSending, setIsSending] = useState(false);

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: taskName,
      completed: true,
    };
    axios
      .post("http://localhost:3001/tasks", obj)
      .then(({ data }) => {
        onTaskAdd(list.id, data);
      })
      .catch(() => alert("ошибка"))
      .finally(setIsSending(false));
  };

  return (
    <div className="tasks__form">
      {!visiblePopup && (
        <div
          onClick={() => setVisiblePopup(!visiblePopup)}
          className="tasks__form-new"
        >
          <img src={addSvg} alt="Добавить"></img>
          <span>Новая Задача</span>
        </div>
      )}
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
            {isSending ? "Задача добавляется" : "Добавить задачу"}
          </button>
          <button
            onClick={() => setVisiblePopup(!visiblePopup)}
            className="button button--grey"
          >
            Отмена
          </button>
        </div>
      )}
    </div>
  );
}

export default AddTaskForm;
