import { useState } from "react";

function TodoInput({ todoList, setTodoList }) {

    const [inputVal, setInputVal] = useState("")

    const updateInputVal = (e) => {
        setInputVal(e.target.value);
    }

    const addTodo = (e) => {
        e.preventDefault();
        let regex = new RegExp(/\S/)

        if (!regex.test(inputVal)) {
            setInputVal("");
            return false
        }

        if (todoList.some(item => item.label === inputVal)) {
            setInputVal("");
            return false
        }

        setTodoList([...todoList, { label: inputVal.trim(), status: "incomplete", edit: false }])
        setInputVal("");
    }

    return (
        <form onSubmit={addTodo}>
            <input className="new-todo" placeholder="What needs to be done?" autoFocus value={inputVal} onChange={updateInputVal} />
            <input type="submit" style={{ display: "none" }} />
        </form>
    )
}

export default TodoInput;