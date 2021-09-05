import { useEffect, useState } from "react";
import TodoFooter from "./Components/TodoFooter";
import TodoInput from "./Components/TodoInput";
import TodoMain from "./Components/TodoMain";

function App() {

    let defaultTodoList = [{ label: "Learn JavaScript", status: "completed", edit: false }, { label: "Learn React", status: "incomplete", edit: false }, { label: "Have a Life!", status: "incomplete", edit: false }]

    let savedTodoList = JSON.parse(localStorage.getItem("todoList"));

    const [todoList, setTodoList] = useState(() => {
        if (savedTodoList) { return savedTodoList }
        else { return defaultTodoList }
    });

    const [filter, setFilter] = useState("All");

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }, [todoList])

    return (
        <div className="App">
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <TodoInput todoList={todoList} setTodoList={setTodoList} />
                </header>


                {/*This section should be hidden by default and shown when there are todos*/}

                {todoList.length > 0 && <TodoMain todoList={todoList} setTodoList={setTodoList} filter={filter} />}

                {/*This footer should be hidden by default and shown when there are todos*/}

                {todoList.length > 0 && <TodoFooter todoList={todoList} setFilter={setFilter} filter={filter} setTodoList={setTodoList} />}

            </section>

            <footer className="info">
                <p>Click to edit a todo</p>
                <p><a href="https://codepen.io/dmitrysharabin/pen/MWgQNYZ?editors=1000">Original Project</a> Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
                <br />
                <p>Converted to React by <a href="https://github.com/denizkukul">Deniz Kukul</a></p>
            </footer>
        </div>
    )
}

export default App;
