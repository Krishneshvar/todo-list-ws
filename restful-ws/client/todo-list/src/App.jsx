import './App.css'

import { useState } from 'react'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask('')
    }
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className='home-container'>
      <nav>
        <h3 className=""> Task Manager </h3>
      </nav>
      
      <main>
        <div className='task-creator'>
          <div className='create-container'>
            <input
              type="text"
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              className="new-task"
            />
            <button onClick={addTask} className="add-btn">
              Add
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          {
            tasks.map(task => (
              <div key={task.id} className="tasks">
                <div className="">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className=""
                  />
                  <span className="">
                    {task.text}
                  </span>
                </div>
                <button onClick={() => deleteTask(task.id)} className="">
                  Delete
                </button>
              </div>
            ))
          }
        </div>
      </main>
      
      <footer>
        &copy; 2024 Task Manager. All rights reserved.
      </footer>
    </div>
  )
}
