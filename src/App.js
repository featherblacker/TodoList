import './App.css';
import Form from "./Form";
import TodoList from "./TodoList";
import React, {useEffect, useState} from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import {useAuth0} from "@auth0/auth0-react";


function App() {
    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState([]);

    let {user, isAuthenticated} = useAuth0();

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
        if (isAuthenticated) {
            localStorage.setItem(user.name, JSON.stringify(todos))
        } else {
            localStorage.setItem('todos', JSON.stringify(todos))
        }
    }

    const getLocalTodos = () => {
        if (isAuthenticated) {
            let todosLocal = JSON.parse(localStorage.getItem(user.name));
            setTodos(todosLocal);
            console.log(true)
        } else if (localStorage.getItem('todos')) {
            let todosLocal = JSON.parse(localStorage.getItem('todos'));
            setTodos(todosLocal);
            console.log("load")
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

    useEffect(() => {
        getLocalTodos();
    }, [isAuthenticated])

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
