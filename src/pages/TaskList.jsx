import axios from "axios";
import React, { useState, useEffect } from "react";
import Taskdata from "./Taskdata";
import "./Tasklist.css";
import { useNavigate } from "react-router-dom";
import { url } from "../backend";

function TaskList() {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    completed: false,
    color: "",
    Date: ""
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setNewTask({
        ...newTask,
        [name]: checked,
        completed: true,
      });
    } else {
      setNewTask({
        ...newTask,
        [name]: value,
      });
    }
  };

  const addTask = async (fun) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
     
      
        await axios.post(`${url}/api/task/tasks`, newTask, {
          headers: headers,
        });
        alert("Task is created");
        navigate("/task");
        window.location.reload(false); // Refresh the page without showing activity
      
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <div className="task-list-container">
      <div className="task-input-form">
        <h1 style={{ marginTop: "40px" }}>Add Todo</h1>
        {!isLoggedIn && (
          <p style={{ color: "white", fontSize: "30px" }}>
            Please Login First You are not Authorized
          </p>
        )}
        {isLoggedIn && (
          <div className="input-form">
            <input
              className="input-field"
              type="text"
              placeholder="Title"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
            />
            <br />
            <input
              className="input-field"
              type="text"
              placeholder="Description"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="completed">Completed:</label>
            <input
              className="checkbox"
              type="checkbox"
              name="completed"
              checked={newTask.completed}
              onChange={handleInputChange}
            />
            <select
              className="select-field"
              onChange={handleInputChange}
              name="color"
              id=""
            >
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </select>
            <input
              className="input-field"
              type="text"
              style={{ width: "100px" }}
              onChange={handleInputChange}
              name="Date"
              value={newTask.Date}
            />
            <button className="submit-button" onClick={addTask}>
              Submit task
            </button>
          </div>
        )}
      </div>
      <div className="task-data">
        <Taskdata />
      </div>
    </div>
  );
}

export default TaskList;
