import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Homepage from './Homepage'
import TaskList from './TaskList'
import Edittask from './Edittask'


function MainRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Homepage/>} ></Route>
<Route path='/login' element={<Login/>} ></Route>
<Route path='/register' element={<Register/>} ></Route>
<Route path='/task' element={<TaskList/>} ></Route>
<Route path='/task/task/:id' element={<Edittask/>}></Route>



    </Routes>
  )
}

export default MainRoutes
