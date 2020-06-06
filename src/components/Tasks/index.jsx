import React from "react";

import AddTaskForm from "./AddTaskForm";

import editSvg from "../../assets/img/edit.svg";

import axios from "axios";

import "./Tasks.scss";

const Tasks = ({ lists, onEditTitle, onAddTask }) => {
  const editTitle = () => {
    const x = window.prompt("Введите новое значение", lists.name);
    x && onEditTitle(lists.id, x);
    x &&
      axios
        .patch("http://localhost:3001/lists/" + lists.id, {
          name: x,
        })
        .catch(() => alert("ошибка"));
  };
  console.log(lists);
  return (
    <div className="tasks">
      <h2 style={{ color: lists.color.hex }} className="tasks__title">
        {lists.name}
        <img onClick={editTitle} src={editSvg} alt="Edit icon" />
      </h2>
      <div className="tasks__items">
        {lists.hasOwnProperty("tasks") && !lists.tasks.length && (
          <h2>Задачи отсутствуют</h2>
        )}
        <ul>
          <li>
            {lists.hasOwnProperty("tasks") &&
              lists.tasks.map((task) => (
                <div key={task.id} className="tasks__items-row">
                  <div className="checkbox">
                    <input
                      id={task.id}
                      type="checkbox"
                      checked={task.completed}
                    />
                    <label htmlFor={task.id}>
                      <svg
                        width="11"
                        height="8"
                        viewBox="0 0 11 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </label>
                  </div>
                  <input readOnly value={task.text} />
                </div>
              ))}
          </li>
        </ul>
      </div>
      <AddTaskForm list={lists} onTaskAdd={onAddTask}></AddTaskForm>
    </div>
  );
};

export default Tasks;
