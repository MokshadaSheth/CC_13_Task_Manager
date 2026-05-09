import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const API = 'http://localhost:5000';
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;
    
    try {
      await axios.post(`${API}/tasks`, { title });
      setTitle('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleComplete = async (task) => {
    try {
      await axios.put(`${API}/tasks/${task._id}`, {
        completed: !task.completed
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="container">
      <h1>✓ Task Manager</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="tasks-list">
        {tasks.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#bbb',
            fontSize: '1.1em',
            fontWeight: '500'
          }}>
            📝 No tasks yet. Add one to get started!
          </div>
        ) : (
          tasks.map((task) => (
            <div className="task-card" key={task._id}>
              <span
                className={task.completed ? 'completed' : ''}
              >
                {task.title}
              </span>

              <div>
                <button onClick={() => toggleComplete(task)}>
                  {task.completed ? '↩ Undo' : '✓ Done'}
                </button>

                <button onClick={() => deleteTask(task._id)}>
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;