import React, {useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import todoService from "../services/todo.service";
import { Button } from "react-bootstrap";

function DeleteTodos(props) {
    const [todos, setTodos] = useState([]);
    const [deleted, setDeleted] = useState(false);

    const deleteTodos = () => {
        todoService.deleteAll()
            .then(response => {
                setTodos([]);
                setDeleted(true);
                props.onTodosDeleted();
            })
            .catch(e => {
                console.log(e);
            })
    };

    return(
        <div className="d-flex align-items-center flex-column">
            <Button onClick={deleteTodos}>Delete All</Button>
        </div>
    )
}

export default DeleteTodos;