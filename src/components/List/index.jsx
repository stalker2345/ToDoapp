import React from "react";

import "./List.scss";
import classNames from "classnames";

import axios from "axios";

import Badge from "../Budge/index.jsx";

import removeSvg from "../../assets/img/remove.svg";

const List = ({
  items,
  isRemovable,
  onClick,
  onRemove,
  onClickItem,
  activeItem,
  active,
}) => {
  const removed = (e) => {
    window.confirm("Вы хотите удалить?");
    axios.delete("http://localhost:3001/lists/" + e).then(onRemove({ id: e }));
  };

  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, {
            active: active || (activeItem && activeItem.id === item.id),
          })}
          onClick={onClickItem && (() => onClickItem(item))}
        >
          <i>{item.icon || <Badge color={item.color.name}></Badge>}</i>
          <span>
            {item.name}
            <span className="tasks-length">
              {item.id && `  (${item.tasks.length})`}
            </span>
          </span>

          {isRemovable && (
            <img
              onClick={() => removed(item.id)}
              className="list__remove-icon"
              src={removeSvg}
              alt="Remove icon"
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
