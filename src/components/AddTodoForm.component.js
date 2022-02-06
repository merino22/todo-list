import React, { useState } from "react";
import todoService from "../services/todo.service";

function AddTodo(props) {
    
    const initialTodoState = {
        name: "",
        completed: false
    };

    const createTodoBtn = {
      margin: "10px 0 0 0",
      backgroundColor: "#C62368",
      borderWidth: 0
    }

    
    
    const [todo, setTodo] = useState(initialTodoState);
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState("");
    const nameTodo = React.useRef();

    const [todos, setTodos] = useState([]);

    const handleInputChange = event => {
        const { name, value } = event.target
        setTodo({ ...todo, [name]: value });
    }

    const saveTodo = (e) => {
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

            nameTodo.current.value = "";
    };
    return (
        <div className="submit-form" id="todoForm">
          {(
            <div className="d-flex align-items-center flex-column">
              <div className="form-group mb-auto p-3">
                <label htmlFor="title" style={{color: "#C62368"}}>YOUR TODOs</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  ref={nameTodo}
                  placeholder="Add New TODO"
                  onChange={handleInputChange}
                  name="title"
                  style={{width: "50vw"}}
                />
              </div>
              <button onClick={saveTodo} className="btn btn-success" style={createTodoBtn}>
                Create
              </button>
            </div>
          )}
        </div>
      );
}

export default AddTodo;