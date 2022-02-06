import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormCheck, ListGroup, ListGroupItem, Button} from 'react-bootstrap';

import AddTodo from './components/AddTodoForm.component';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import TodosList from './components/listTodos.component';
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

  render() {
    const { todos } = this.state;

    return(
        <div className="container">
            <AddTodo onTodoAdd={this.retrieveTodos}></AddTodo>
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
