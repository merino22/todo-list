import React, { useState, useEffect } from "react";
import todoService from "../services/todo.service";

const Todo = props => {
  const initialTodoState = {
    id: null,
    title: "",
    state: false,
  };
  const [currentTodo, setCurrentTodo] = useState(initialTodoState);
  const [message, setMessage] = useState("");

  const getTodo = id => {
    todoService.get(id)
      .then(response => {
        setCurrentTodo(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  useEffect(() => {
    getTodo(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTodo({ ...currentTodo, [name]: value });
  };
  const updatePublished = status => {
    var data = {
      id: currentTodo.id,
      title: currentTodo.title,
      state: currentTodo.state
    };
    todoService.update(currentTodo.id, data)
      .then(response => {
        setCurrentTodo({ ...currentTodo, state: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  const updateTodo = () => {
    todoService.update(currentTodo.id, currentTodo)
      .then(response => {
        console.log(response.data);
        setMessage("The Todo was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTodo = () => {
    todoService.remove(currentTodo.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/tutorials");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTodo ? (
        <div className="edit-form">
          <h4>Todo</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTodo.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTodo.state ? true : false}
            </div>
          </form>
          <button className="badge badge-danger mr-2" onClick={deleteTodo}>
            Delete
          </button>
          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTodo}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Todo...</p>
        </div>
      )}
    </div>
  );
};
export default Todo;