import React from "react";

import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

import editSvg from "../../assets/img/edit.svg";

import axios from "axios";

import "./Tasks.scss";

const Tasks = ({
  lists,
  onEditTitle,
  onAddTask,
  onRemove,
  onEditTask,
  onCompliteTask,
}) => {
  const editTitle = () => {
    const x = window.prompt("Введите новое значение", lists.name);
    x && onEditTitle(lists.id, x);

    x &&
      axios
        .patch("https://todoshechka1.herokuapp.com/lists/" + lists.id, {
          name: x,
        })
        .catch(() => alert("ошибка"));
  };

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
              lists.tasks.map((task, index) => (
                <Task
                  list={lists}
                  key={index}
                  {...task}
                  onRemove={onRemove}
                  onEdit={onEditTask}
                  onComplite={onCompliteTask}
                />
              ))}
          </li>
        </ul>
      </div>
      <AddTaskForm list={lists} onTaskAdd={onAddTask}></AddTaskForm>
    </div>
  );
};

export default Tasks;
