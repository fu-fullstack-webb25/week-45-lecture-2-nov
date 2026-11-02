import { useRef } from "react";
import type { SubmitEvent } from "react";

type PropType = {
    handleAddTodo : (title : String) => void;
}

const TaskForm = ({ handleAddTodo } : PropType) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e : SubmitEvent<HTMLFormElement>) : void => {
        e.preventDefault();
        if(inputRef.current) {
            const title = inputRef.current.value;
            inputRef.current.value = '';
            handleAddTodo(title);
        }
    }

    return (
        <form className="form" onSubmit={ handleSubmit }>
            <input type="text" className="form-input" ref={ inputRef } />
            <button className="form-button">Add task!</button>
        </form>
    )
}

export default TaskForm;