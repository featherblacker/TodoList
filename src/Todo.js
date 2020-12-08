import React from 'react'

const Todo = ({todo, todos, setTodos}) => {
    const completeHandler = () => {
        setTodos(todos.map((item) => {
            if (item.id === todo.id) {
                return {
                    ...item,
                    completed: !item.completed
                }
            }
            return item
        }))
    }

    const deleteHandler = () => {
        setTodos(todos.filter(element => element.id !== todo.id))
    }
    return (
        <div className={"todo"}>
            <li className={`todo-item ${todo.completed ? "completed": ''}`}>{todo.text}</li>
            <button className={"complete-btn"} onClick={completeHandler}><i className={"fas fa-check"}/></button>
            <button className={"trash-btn"} onClick={deleteHandler}><i className={"fas fa-trash"}/></button>
        </div>
    )
}

export default Todo