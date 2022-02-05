import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import todoService from "../services/todo.service";

const AddTodo = () => {
    
    const initialTodoState = {
        name: "",
        completed: false
    };
    
    const [todo, setTodo] = useState(initialTodoState);
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState("");

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
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newTodo = () => {
        setTodo(initialTodoState);
        setSubmitted(false);
    }
    
    const handleSubmit = e => {
        e.preventDefault();

        if(!name)
            return;
        
        //createTodo(name);
        setName("");
    }

    return (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={newTodo}>
                Add
              </button>
            </div>
          ) : (
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
      );
}

export default AddTodo;