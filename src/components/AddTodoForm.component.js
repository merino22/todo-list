import React, { useState } from "react";
import todoService from "../services/todo.service";
import TodosList from "./listTodos.component";

import 'bootstrap/dist/css/bootstrap.min.css';
import { FormCheck, ListGroup, ListGroupItem } from 'react-bootstrap';

function AddTodo(props) {
    
    const initialTodoState = {
        name: "",
        completed: false
    };
    
    const [todo, setTodo] = useState(initialTodoState);
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState("");

    const [todos, setTodos] = useState([]);

    const handleInputChange = event => {
        const { name, value } = event.target
        setTodo({ ...todo, [name]: value });
    }

    const saveTodo = () => {
        var data = {
            title: todo.title,
            state: todo.state
        };

        todoService.create(data)
            .then(response => {
                setTodo({
                    id: response.data.id,
                    title: response.data.title,
                });
                setSubmitted(true);
                console.log(response.data);
                props.onTodoAdd();
            })
            .catch(e => {
                console.log(e);
            });
    };
    return (
        <div className="submit-form">
          {(
            <div className="d-flex align-items-center flex-column">
              <div className="form-group mb-auto p-3">
                <label htmlFor="title" style={{color: "white"}}>Add New Todo</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={todo.title}
                  onChange={handleInputChange}
                  name="title"
                  style={{width: "50vw"}}
                />
              </div>
              <button onClick={saveTodo} className="btn btn-success">
                Create
              </button>
            </div>
          )}
        </div>
      );
}

export default AddTodo;