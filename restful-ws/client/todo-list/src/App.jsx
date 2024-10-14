import './App.css'
import { useState, useEffect } from 'react'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  // Fetch tasks from the backend on component mount
  useEffect(() => {
    fetch('http://localhost:8080/tasks_server_war_exploded/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error))
  }, [])

  // Add task by sending POST request to the backend
  const addTask = async () => {
    if (newTask.trim() !== '') {
      const taskToAdd = { id: Date.now(), text: newTask, completed: false };
      
      // Send the task to the backend
      await fetch('http://localhost:8080/tasks_server_war_exploded/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskToAdd),
      });
  
      setTasks([...tasks, taskToAdd]);
      setNewTask('');
    }
  };    

  // Toggle task completion (optional)
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  // Delete task by sending DELETE request to the backend
  const deleteTask = async (id) => {
    // Send the delete request to the backend
    await fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: 'DELETE',
    });
  
    setTasks(tasks.filter(task => task.id !== id));
  };  

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
