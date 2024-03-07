import "./styles.scss";
import React, { useState } from "react";
import iconCross from "./img/icon-cross.svg";
import iconCheck from "./img/icon-check.svg";
import iconMoon from "./img/icon-moon.svg";
import iconSun from "./img/icon-sun.svg";

function App() {
  let mainList = [
    "Complete online JavaScript course",
    "Jog around the park 3x",
    "10 minutes meditation",
    "Read for 1 hour",
    "Pick up groceries",
    "Complete Todo App on Frontend Mentor",
  ];
  const [todoList, setTodoList] = useState(mainList);
  const [inputText, setInputText] = useState("");
  const [dark, setDark] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
  const handleAddTodo = (e) => {
    e.preventDefault();
    setTodoList([...todoList, inputText]);
    setInputText("");
  };

  if (dark === true) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  const toggleItemSelection = (index) => {
    const isSelected = selectedItems.includes(index);
    if (isSelected) {
      setSelectedItems(selectedItems.filter((item) => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const handleDelete = (index) => {
    const isSelected = selectedItems.includes(index);

    setTodoList(todoList.filter((_, i) => i !== index));

    if (isSelected) {
      const updatedSelectedItems = selectedItems.filter(
        (item) => item !== index
      );
      const adjustedSelectedItems = updatedSelectedItems.map((item) =>
        item > index ? item - 1 : item
      );
      setSelectedItems(adjustedSelectedItems);
    }
  };

  return (
    <div className="App">
      <img alt="" className={dark ? "mainBack darkImg" : "mainBack"} />
      <div className="mainContent">
        <header>
          <h1 className="">TODO</h1>
          <label>
            <input type="checkbox" />
            <img
              src={ iconMoon}
              className={dark ? "iconMoonHidden" : "iconMoon"}
              onClick={() => setDark(!dark)}
              alt=""
            />
            <img 
            src={ iconSun}
            className={dark ? "iconSun" : "iconSunHidden"}
            onClick={() => setDark(!dark)}
            alt=""
            />
            <span className="toggle"></span>
          </label>
        </header>
        <div className="input-section">
          <div className="circle"></div>
          <form onSubmit={handleAddTodo}>
            <input
              value={inputText}
              onChange={handleInputChange}
              placeholder="Create a new todo..."
            />
          </form>
        </div>
        <div className="info">
          <ul>
            {todoList.map((item, index) => (
              <div className="lista">
                <div
                  className={`circle ${
                    selectedItems.includes(index) ? "check " : ""
                  }`}
                  onClick={() => toggleItemSelection(index)}
                >
                  <img
                    src={iconCheck}
                    className={`iconCheck ${
                      selectedItems.includes(index) ? "iconChecked " : ""
                    }`}
                    alt=""
                  />
                </div>
                <li
                  onClick={() => toggleItemSelection(index)}
                  className={selectedItems.includes(index) ? "selected" : ""}
                  key={index}
                >
                  {item}
                </li>
                <img
                  className="iconCross"
                  src={iconCross}
                  onClick={() => handleDelete(index)}
                  alt=""
                />
              </div>
            ))}
            <li className="bottom">
              <span>5 items left</span>
              <div className="buttons-1">
                <span className="selectedSection">All</span>
                <span>Active</span>
                <span>Completed</span>
              </div>
              <span>Clear Completed</span>
            </li>
          </ul>
        </div>
        <div className="buttons-2">
          <span className="selectedSection">All</span>
          <span>Active</span>
          <span>Completed</span>
        </div>
        <footer>
          <p>Drag and drop to reorder list</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
