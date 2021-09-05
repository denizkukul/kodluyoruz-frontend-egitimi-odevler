function TodoFooter({ todoList, setFilter, filter, setTodoList }) {

    let itemsLeft = todoList.filter(item => item.status === "incomplete")

    const clearCompleted = () => {
        setTodoList(todoList.filter(item => {
            return item.status === "incomplete"
        }))
    }

    const changeFilter = (e) => {
        setFilter(e.target.innerText)
    }

    return (
        <footer className="footer">

            {/*This should be `0 items left` by default*/}
            <span className="todo-count">
                <strong>{itemsLeft.length}</strong>
                {itemsLeft.length === 1 ? " item left" : " items left"}
            </span>

            <ul className="filters">
                <li>
                    <span className={filter === "All" ? "selected" : ""} onClick={changeFilter}>All</span>
                </li>
                <li>
                    <span className={filter === "Active" ? "selected" : ""} onClick={changeFilter}>Active</span>
                </li>
                <li>
                    <span className={filter === "Completed" ? "selected" : ""} onClick={changeFilter}>Completed</span>
                </li>
            </ul>

            {/*Hidden if no completed items are left ↓*/}
            {itemsLeft.length < todoList.length &&
                <button className="clear-completed" onClick={clearCompleted}>
                    Clear completed
                </button>
            }
        </footer>
    )
}

export default TodoFooter;