import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormCheck, ListGroup, ListGroupItem } from 'react-bootstrap';

import AddTodo from './components/AddTodoForm.component';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import TodosList from './components/listTodos.component';

function App() {
  
  const todoList = ['Clean Room', 'Wash Dishes', 'Study']

  return (
    <div className="App">
      <TodosList></TodosList>
    </div>
  );
}

export default App;
