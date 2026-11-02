import Task from "./components/Task";
import TaskForm from "./components/TaskForm";
import { initialTasks } from "./data/tasks";
import type { TaskType } from "./types/todo.types";
import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState<TaskType[]>(initialTasks);

  const handleTodoClick = (id : String) : void => {
    setTasks(prev => {
      return prev.map(task => {
        if(task.id === id) {
          return { ...task, done : !task.done }
        }
        return task;
      })
    });
  }

  const handleAddTodo = (title : String) : void => {
    const newTask : TaskType = {
      id : crypto.randomUUID().slice(0, 5),
      title,
      done : false
    }

    setTasks(prev => [...prev, newTask]);
  }

  return (
    <div className="app">
      <h1 className="title">TaskTracker</h1>
      <TaskForm 
        handleAddTodo={ handleAddTodo }
      />
      <ul className="task-list">
        {
          tasks.map(task => {
            return <Task 
              task={ task }
              handleTodoClick={ handleTodoClick }
            />
          })
        }
      </ul>
    </div>
  )
}

export default App
