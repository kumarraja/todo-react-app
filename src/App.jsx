import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";

function App() {
  const [inputText, setInputText] = useState("");
  const [filterTodo, setFilterTodo] = useState("all");
  const [todo, setTodo] = useState([]);

  const handleTodoAdd = (e) => {
    e.preventDefault();
    setTodo([
      ...todo,
      { id: +new Date(), text: inputText, isCompleted: false },
    ]);
    setInputText("");
  };

  const handleEditTodo = (todoId) => {};

  const handleMarkAsCompleted = (e, todoId) => {
    const newTodoArr = todo.map((eachTodo) => {
      const newTodo = { ...eachTodo };
      if (newTodo.id === todoId) {
        newTodo.isCompleted = e.target.checked;
      }

      return newTodo;
    });
    setTodo(newTodoArr);
  };

  const handleDeleteTodo = (todoId) => {
    setTodo((prevTodo) =>
      prevTodo.filter((eachTodo) => eachTodo.id !== todoId)
    );
  };

  return (
    <div className="todo-container">
      <div className="todo-app">
        <h1> Todo App</h1>
        <h2>What needs to be done?</h2>
        <form className="todo-form">
          <input
            type="text"
            className="todo-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <Button title="Add" onClick={handleTodoAdd} className="add-button" />
        </form>
        {/* <form className="todo-edit-form" style={{ marginBottom: "10px" }}>
          <input
            type="text"
            className="todo-input"
            style={{ width: "100%", marginBottom: "5px" }}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="submit"
            className="button delete-button"
            onClick={handleTodoAdd}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="button add-button"
            onClick={handleTodoAdd}
          >
            Update
          </button>
        </form> */}
        <div className="button-group">
          <Button
            title="Select All"
            onClick={() => setFilterTodo("all")}
            className={` toggle-button ${
              filterTodo === "all" ? "toggle-button-active" : ""
            }`}
          />
          <Button
            title="Active"
            onClick={() => setFilterTodo("active")}
            className={` toggle-button ${
              filterTodo === "active" ? "toggle-button-active" : ""
            }`}
          />
          <Button
            title="Completed"
            onClick={() => setFilterTodo("completed")}
            className={` toggle-button ${
              filterTodo === "completed" ? "toggle-button-active" : ""
            }`}
          />
        </div>

        <div>
          <ul>
            {todo
              .filter((eachTodo) => {
                if (filterTodo === "all") {
                  return true;
                }
                if (filterTodo === "active") {
                  return !eachTodo.isCompleted;
                }
                if (filterTodo === "completed") {
                  return eachTodo.isCompleted;
                }
              })
              .map((todo) => (
                <ListItem
                  key={todo.id}
                  id={todo.id}
                  task={todo.text}
                  isCompleted={todo.isCompleted}
                  onEditClick={handleEditTodo}
                  onDeleteClick={handleDeleteTodo}
                  onCheckboxClick={handleMarkAsCompleted}
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

const ListItem = ({
  task,
  id,
  isCompleted,
  onEditClick,
  onDeleteClick,
  onCheckboxClick,
}) => (
  <li>
    <div className="list-item">
      <Checkbox
        id={id}
        label={task}
        isCompleted={isCompleted}
        onClick={(e) => onCheckboxClick(e, id)}
      />
      <div>
        <Button
          title="Edit"
          onClick={() => onEditClick(id)}
          className="edit-button"
        />
        <Button
          title="Delete"
          onClick={() => onDeleteClick(id)}
          className="delete-button"
        />
      </div>
    </div>
  </li>
);
