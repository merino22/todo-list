import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
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
                    state: response.data.state
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
      <div>
        <div className="submit-form">
          {(
            <div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={todo.title}
                  onChange={handleInputChange}
                  name="title"
                />
              </div>
              <button onClick={saveTodo} className="btn btn-success">
                Create
              </button>
            </div>
          )}
        </div>
        <div className="container">
                <ListGroup>
                {todos.map((todo, index) =>
                    <ListGroupItem className='todoItemWrapper' key={todo.id}>
                        <div className='row'>
                            <div className='col-md-6'>{todo.title}</div>
                            <div className='col-md-6'><FormCheck type='checkbox'></FormCheck></div>
                        </div>
                    </ListGroupItem>
                )}
                </ListGroup>
            </div>
      </div>
      );
}

export default AddTodo;