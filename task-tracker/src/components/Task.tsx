import type { TaskType } from '../types/todo.types';

type PropType = {
    task : TaskType;
    handleTodoClick : (id : String) => void
}

const Task = ({ task, handleTodoClick } : PropType) => {
    return (
        <li
            className={ task.done ? 'task task-done' : 'task' }
            onClick={ () => handleTodoClick(task.id) }
        >
            { task.title }
        </li>
    )
}

export default Task;