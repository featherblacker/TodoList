import React from 'react';
import Todo from "./Todo";

const TodoList = ({setTodos, todos, filteredTodos}) =>{
    return(
        <div className={"todo-container"}>
            <ul className={"todo-list"}>
                {filteredTodos.map((todo, index)=>{
                    return(
                        <Todo key={index} todo={todo}
                        setTodos={setTodos} todos={todos}/>
                    )
                })}
            </ul>
        </div>
    )
}
export default TodoList;