import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormCheck, ListGroup, ListGroupItem } from 'react-bootstrap';

import AddTodo from './components/AddTodoForm.component';

function App() {

  const todoList = ['Clean Room', 'Wash Dishes', 'Study']

  return (
    <div className="App">
      <div>
        <AddTodo></AddTodo>
        <ListGroup className='container todoListWrapper'>
          {todoList.map((todo) =>
            <ListGroupItem className='todoItemWrapper'>
              <div className='row'>
                <div className='col-md-6'>{todo}</div>
                <div className='col-md-6'><FormCheck type='checkbox'></FormCheck></div>
              </div>
            </ListGroupItem>
          )}
        </ListGroup>
      </div>
    </div>
  );
}

export default App;
