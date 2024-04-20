import React, { useEffect, useState } from "react";
import "./Edittask.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../backend";

function Edittask() {
  const[res,setRes]=useState([])
  
  const { id } = useParams()
  console.log(id);
  const navigate = useNavigate();
 const get_data=async()=>{
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res = await axios.get(`${url}/api/task/tasks`, {
      headers: headers,
    });
    let id_math=res.data.find((el)=>el._id===id)
    
   setRes(id_math)
    
    
    // get=res.data.find((el)=>el.id==id)
    // console.log(get)
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
 }
 useEffect(()=>{
  get_data()
 },[])
  const [editedTask, setEditedTask] = useState({
    title:"",
    description:"",
    completed: false,
    color:"",
    Date:""
  });
  console.log(res)
  

 

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;


    // For checkboxes, use the 'checked' property to determine the value
    const newValue = type === "checkbox" ? checked : value;

    setEditedTask({
      ...editedTask,
      [name]: newValue,
    });
  };

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const role = localStorage.getItem("role");
      // Send a PATCH request to update the task
     
     
        const response = await axios.patch(
          `${url}/api/task/tasks/${id}`,
          editedTask,
          {
            headers: headers,
          }
        );
      

      // Show a success message or handle the response as needed
      alert("Task Updated successfully");

      // Redirect back to the task list page
      navigate("/task");
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  const handleClose = () => {
    navigate("/task");
  };

  return (
    <div className="edit-task-container">
      <h2>Edit Todo</h2>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        value={editedTask.title}
        onChange={handleInputChange}
        placeholder="Enter new title"
      />
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        name="description"
        value={editedTask.description}
        onChange={handleInputChange}
        placeholder="Enter new description"
      />
      <label style={{ color: "white" }}>
        {editedTask.completed ? "✅ Completed" : "⏳ Pending"}:
        <input
          type="checkbox"
          name="completed"
          checked={editedTask.completed}
          onChange={handleInputChange}
          
        />
      </label>
      <label style={{ color: "white" }}>
       
        <input
        placeholder="color"
          type="text"
          name="color"
          checked={editedTask.color}
          onChange={handleInputChange}
        />
      </label>
      <label style={{ color: "white" }}>
      
        <input
        placeholder="12-7-2024"
          type="text"
          name="Date"
          checked={editedTask.Date}
          onChange={handleInputChange}
        />
      </label>
     

      <button onClick={handleEdit}>Save Changes</button>
      <button onClick={handleClose} className="close-button">
        Close
      </button>
      <label style={{ color: "white" }}>
        {editedTask.completed ? "✅ Completed" : "⏳ Pending"}:
        <input

          type="checkbox"
          name="completed"
          checked={editedTask.completed}
          onChange={handleInputChange}
        />
      </label>
    </div>
  );
}

export default Edittask;
