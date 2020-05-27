import React, { useState, useEffect } from "react";
import List from "../List";

import "./AddButtonList.scss";
import Badge from "../Budge/index.jsx";

import CloseSvg from "../../assets/img/close.svg";

import axios from "axios";

//import { lists } from "../../assets/db.json";

const AddListButton = ({ onAdd, colors, lists }) => {
  const onClose = () => {
    setVisiblePopup(false);

    setInputValue("");
    setSelectedColor(colors[0].id);
  };

  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(3);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const addList = () => {
    if (inputValue !== "") {
      setIsLoading(true);
      axios
        .post("http://localhost:3001/lists", {
          name: inputValue,
          colorId: selectedColor,
        })
        .then(({ data }) => {
          // console.log(data);

          const colorName = colors.filter((c) => c.id === selectedColor)[0]
            .name;
          const listObj = { ...data, color: colorName };
          //console.log(listObj);
          onAdd(listObj);
          onClose();
        })
        .finally(setIsLoading(false));

      // onAdd({});

      return;
    }
    return alert("введите");
  };

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(!visiblePopup)}
        items={[
          {
            className: "list__add-button",
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: "Добавить список",
          },
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            onClick={onClose}
            src={CloseSvg}
            alt="close-btn"
            className="add-list__popup-close-btn"
          />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Название списка"
          ></input>
          <div className="add-list__popup_colors">
            {colors.map((color) => (
              <Badge
                onClick={() => setSelectedColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && "active"}
              ></Badge>
            ))}
          </div>
          <button onClick={addList} className="button">
            {isLoading ? "Добавление..." : "Добавить"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddListButton;
