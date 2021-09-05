import { useEffect } from "react";
import TodoEdit from "./TodoEdit";

function TodoMain({ todoList, setTodoList, filter }) {

    const filterTodoList = () => {
        if (filter === "Active") {
            return todoList.filter(item => item.status === "incomplete")
        }
        else if (filter === "Completed") {
            return todoList.filter(item => item.status === "completed")
        }
        else {
            return todoList;
        }
    }

    let filteredTodoList = filterTodoList();

    const toggleComplete = (e) => {
        let label = e.target.getAttribute("label");
        e.target.nextSibling.style = "transition: color 0.4s;"

        setTodoList(todoList => {
            return todoList.map((item) => {
                if (item.label === label) {
                    if (item.status === "completed") {
                        return { ...item, status: "incomplete" }
                    }
                    else {
                        return { ...item, status: "completed" }
                    }
                }
                else {
                    return { ...item }
                }
            })
        });

        setTimeout(() => { if (e.target.nextSibling) { e.target.nextSibling.style = "transition: none;" } }, 400);

    }

    const toggleCompleteAll = () => {

        let todos = Array.from(document.querySelectorAll(".todo-list li label"));
        todos.forEach(item => item.style = "transition: color 0.4s;");

        setTodoList(todoList => {
            if (todoList.every(item => item.status === "completed")) {
                return todoList.map(item => { return { ...item, status: "incomplete" } });
            }
            else {
                return todoList.map(item => { return { ...item, status: "completed" } });
            }
        })

        setTimeout(() => { todos.forEach(item => item.style = "transition: none;") }, 400);
    }

    const deleteTodo = (e) => {
        let label = e.target.getAttribute("label");

        setTodoList(todoList => {
            return todoList.filter((item) => item.label !== label)
        })

    }

    const startEdit = (e) => {

        let label = e.target.getAttribute("label");

        setTodoList(todoList => {
            return todoList.map((item) => {
                if (item.label === label) {
                    return { ...item, edit: true }
                }
                else {
                    return { ...item }
                }
            })
        });

    }



    useEffect(() => {
        let toggleAll = document.querySelector(".toggle-all");

        if (todoList.every(item => item.status === "completed")) {
            toggleAll.checked = true;
        }
        else {
            toggleAll.checked = false;
        }

    }, [todoList])

    return (
        <section className="main">
            <input className="toggle-all" type="checkbox" />
            <label htmlFor="toggle-all" onClick={toggleCompleteAll}>
                Mark all as complete
            </label>

            <ul className="todo-list">
                {filteredTodoList.map((item, i) => {
                    return (
                        <li key={i} className={item.status}>
                            <div className="view">
                                {item.edit === true ?
                                    <TodoEdit todoList={todoList} setTodoList={setTodoList} label={item.label} />
                                    :
                                    <>
                                        <input label={item.label} className="toggle" type="checkbox" checked={item.status === "completed"} onChange={toggleComplete} />
                                        <label label={item.label} onClick={startEdit}>{item.label}</label>
                                        <button label={item.label} className="destroy" onClick={deleteTodo} />
                                    </>
                                }
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default TodoMain;