import './App.css';
import Form from "./Form";
import TodoList from "./TodoList";
import React, {useEffect, useState} from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";


function App() {
    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState([]);


    const filterHandler = () => {
        switch (status) {
            case "completed":
                setFilteredTodos(todos.filter((todo) => todo.completed))
                break;
            case "uncompleted":
                setFilteredTodos(todos.filter((todo) => !todo.completed))
                break;
            default:
                setFilteredTodos(todos);
                break
        }
    }

    const saveLocalTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    const getLocalTodos = () => {
        if (localStorage.getItem('todos')) {
            let todosLocal = JSON.parse(localStorage.getItem('todos'));
            setTodos(todosLocal);
        } else {
            localStorage.setItem('todos', JSON.stringify([]))
        }

    }

    useEffect(() => getLocalTodos(), []);
    useEffect(() => {
            filterHandler();
            saveLocalTodos();
        }, [todos, status]
    )

    return (
        <div className="App">
            <div className={"login"}>
                <LoginButton/>
                <LogoutButton/>
                <Profile/>
            </div>

            <div className={"content"}>
                <header className="App-header">
                    <h1>ToDo List</h1>
                </header>
                <Form todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText}
                      setStatus={setStatus} setFilteredTodos={setFilteredTodos}/>
                <TodoList setTodos={setTodos} todos={todos} filteredTodos={filteredTodos}/>
            </div>
        </div>
    );
}

export default App;
