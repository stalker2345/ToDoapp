import React from "react";
import editSvg from "../../assets/img/edit.svg";

import "./Tasks.scss";

const Tasks = (lists) => {
  const editTitle = () => {
    const x = window.prompt("Введите новое значение", lists.lists.name);
    x && lists.onEditTitle(lists.lists.id, x);
  };
  console.log(lists.lists.tasks.completed);

  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {lists.lists.name}
        <img onClick={editTitle} src={editSvg} alt="Edit icon" />
      </h2>
      <div className="tasks__items">
        {!lists.lists.tasks.length && <h2>Задачи отсутствуют</h2>}
        <ul className="list">
          <li>
            {lists.lists.tasks.map((task) => (
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
    </div>
  );
};

export default Tasks;
