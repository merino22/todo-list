import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormCheck, ListGroup, ListGroupItem, Button} from 'react-bootstrap';

import AddTodo from './components/AddTodoForm.component';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import TodosList from './components/listTodos.component';
import DeleteTodos from './components/DeleteTodos.component';
import Todo from './components/UpdateTodos.component';

import { Component, useState } from 'react';
import todoService from './services/todo.service';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.retrieveTodos = this.retrieveTodos.bind(this);
    this.getTodo = this.getTodo.bind(this);

    const initialTodoState = {
      id: null,
      title: "",
      state: null
    }

    this.state = {
      todos: [],
      currentTodo: initialTodoState,
      todoChecked: null
    }
  }

  componentDidMount() {
    this.retrieveTodos();
  }

  setCheck() {
    return true;
  }

  retrieveTodos() {
      todoService.getAll()
          .then(response => {
              this.setState({
                  todos: response.data
              });
              console.log(response.data);
          })
          .catch(e => {
              console.log(e);
          })
  }

  getTodo = (e) => {
    let id = e.target.id;
    console.log(id);
    todoService.get(id)
      .then(response => {
          this.setState({
            currentTodo: response.data
          })
          console.log(this.state.currentTodo);
          this.updateTodoState();
      })
      .catch(e => {
        console.log(e);
      })
  }

  handleChange(e) {
    let isChecked = e.target.checked;

    if(isChecked)
      this.setState({
        todoChecked: true
      })
    else
    this.setState({
      todoChecked: false
    })
  }

  updateTodoState() {

    //console.log("Todo checked: " + this.state.todoChecked);

    var data = {
      id: this.state.currentTodo.id,
      title: this.state.currentTodo.title,
      state: this.state.todoChecked,
    }

    console.log(data);
    //console.log(this.state.currentTodo);
    todoService.update(this.state.currentTodo.id, data)
      .then(response => {
        console.log(response.data);
        console.log("Todo was updated successfully.");
      })
      .catch(e => {
        console.log(e);
      })
  }

  deleteTodos() {
    todoService.deleteAll()
      .then(response => {
        this.setState({
          todos: []
        });
      })
      .catch(e => {
        console.log(e);
      })
  }

  render() {
    const { todos } = this.state;
    const { currentTodo } = this.state;
    return(
        <div className='mainWrapper'>
          <div className='todosWrapper'>
          <div className="container d-flex align-items-center flex-column">
            <div className='p-4'>
              <div className='todoFormWrapper'>
                <AddTodo onTodoAdd={this.retrieveTodos}></AddTodo>
              </div>
            </div>
              
            <div>
              <ListGroup>
              {todos.map((todo, index) =>
                  <ListGroupItem className='todoItemWrapper' key={todo.id}>
                      <div className='row'>
                          <div className='col-sm-11'>
                            <div className='wrap-text'>
                              {todo.title}
                            </div>
                          </div>
                          <div className='col-sm-1 d-flex justify-content-end'><FormCheck type='switch' id={todo.id} onClick={this.getTodo} checked={todo.state} onChange={e => this.handleChange(e)}></FormCheck></div>
                      </div>
                  </ListGroupItem>
              )}
              </ListGroup>
            </div>

            <div className='delete-button'>
              <DeleteTodos onTodosDeleted={this.retrieveTodos}></DeleteTodos>
            </div>
          </div>
        </div>
        </div>
    )
  }
}

// function App() {

//   const [todosData, setTodosData] = useState({todos: []});

//   return (
//     <div className="App">
//       <AddTodo onTodoAdd={setTodosData}></AddTodo>
//       {console.log(todosData)}
//       <TodosList todosData={todosData.todos}></TodosList>
//       <Button>Delete All</Button>
//     </div>
//   );
// }

// export default App;
