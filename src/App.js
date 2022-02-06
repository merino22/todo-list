import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormCheck, ListGroup, ListGroupItem, Button} from 'react-bootstrap';

import AddTodo from './components/AddTodoForm.component';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import TodosList from './components/listTodos.component';
import DeleteTodos from './components/DeleteTodos.component';

import { Component, useState } from 'react';
import todoService from './services/todo.service';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.retrieveTodos = this.retrieveTodos.bind(this);

    this.state = {
      todos: []
    }
  }

  componentDidMount() {
    this.retrieveTodos();
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

    return(
        <div className='mainWrapper'>
          <div className='todosWrapper'>
          <div className="container d-flex align-items-center flex-column">
            <div className='p-4'>
              <div className='todoFormWrapper'>
                <AddTodo onTodoAdd={this.retrieveTodos}></AddTodo>
              </div>
            </div>
              
            <div className='p-4'>
              <ListGroup>
              {todos.map((todo, index) =>
                  <ListGroupItem className='todoItemWrapper' key={todo.id}>
                      <div className='row'>
                          <div className='col-md-6'>{todo.title}</div>
                          <div className='col-md-6 d-flex justify-content-end'><FormCheck type='checkbox'></FormCheck></div>
                      </div>
                  </ListGroupItem>
              )}
              </ListGroup>
            </div>

            <div className='p-4'>
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
