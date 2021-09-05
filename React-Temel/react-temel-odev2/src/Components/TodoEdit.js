import { useEffect } from "react";
import { useState } from "react/cjs/react.development";

function TodoEdit({ todoList, setTodoList, label }) {

    const [editVal, setEditVal] = useState(label)

    const stopEdit = (e) => {
        e.preventDefault();

        let regex = new RegExp(/\S/)

        setTodoList(todoList => {
            return todoList.map((item) => {
                if (item.label === label) {
                    if (!regex.test(editVal) || todoList.some(item => item.label === editVal.trim())) {
                        return { ...item, edit: false }
                    }
                    else {
                        return { ...item, label: editVal.trim(), edit: false }
                    }
                }
                else {
                    return { ...item }
                }
            })
        });
    }

    const updateEdit = (e) => {
        setEditVal(e.target.value);
    }

    useEffect(() => {
        document.querySelector("input.edit").select();
    }, [])

    return (
        <form onSubmit={stopEdit}>
            <input className="edit" label={label} onBlur={stopEdit} value={editVal} onChange={updateEdit} />
            <input type="submit" style={{ display: "none" }} />
        </form>
    )
}

export default TodoEdit;