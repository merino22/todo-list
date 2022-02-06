import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormCheck, ListGroup, ListGroupItem, Button} from 'react-bootstrap';

import AddTodo from './components/AddTodoForm.component';
import DeleteTodos from './components/DeleteTodos.component';

import { Component, useState } from 'react';
import todoService from './services/todo.service';

import { FiDelete } from 'react-icons/fi';

import blobSVG from './assets/blob-bg.svg';
import bgFooter from './assets/footer-bg.svg';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.retrieveTodos = this.retrieveTodos.bind(this);
    this.getTodo = this.getTodo.bind(this);
    this.deleteCheckedTodos = this.deleteCheckedTodos.bind(this);
    this.setCheckedTodos = this.setCheckedTodos.bind(this);

    const initialTodoState = {
      id: null,
      title: "",
      state: null
    }

    this.state = {
      todos: [],
      currentTodo: initialTodoState,
      checkedTodos: [],
      todoChecked: null
    }
  }

  componentDidMount() {
    this.retrieveTodos();
  }

  setCheckedTodos() {
    this.state.todos.map((todo) => {
      if(todo.state == true){
        this.setState({
          checkedTodos: [...this.state.checkedTodos, todo.id]
        })
      }
    })
    console.log(this.state.checkedTodos);
  }

  retrieveTodos() {
      todoService.getAll()
          .then(response => {
              this.setState({
                  todos: response.data
              });
              console.log(response.data);
              this.setCheckedTodos();
          })
          .catch(e => {
              console.log(e);
          })
  }

  getTodo = (e) => {
    let id = e.currentTarget.id;
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

  deleteTodo = (e) => {
    let id = e.currentTarget.id;
    console.log(id);
    todoService.delete(id)
      .then(response => {
        console.log(response.data)
        this.retrieveTodos();
      })
      .catch(e => {
        console.log(e);
      })
  }

  deleteCheckedTodos() {
    console.log(this.state.checkedTodos);
    this.state.checkedTodos.map((todo) => {
      todoService.delete(todo)
        .then(response =>{
          console.log(response);
          this.retrieveTodos();
        })
        .catch(e => {
          console.log(e);
        })
    })
  }

  handleChange(e) {
    let isChecked = e.target.checked;
    let id = e.currentTarget.id;

    var tempArr = [...this.state.checkedTodos];
    var index = tempArr.indexOf(id);

    if(isChecked){
      this.setState({
        todoChecked: true,
        checkedTodos: [...this.state.checkedTodos, id]
      })
    } else{
      tempArr.splice(index, 1);
      this.setState({
        todoChecked: false,
        checkedTodos: tempArr
      })
    }
    console.log(this.state.checkedTodos);
  }

  updateTodoState() {

    var data = {
      id: this.state.currentTodo.id,
      title: this.state.currentTodo.title,
      state: this.state.todoChecked,
    }

    console.log(data);
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

    const deleteSingleTodoBtn = {
      margin: "0 0 5px 10px",
      borderRadius: "50%"
    }

    const footerDeleteBtn = {
      margin: "10px 0 10px 0",
      backgroundColor: "black",
      borderWidth: 0
    }

    return(
        <div className='mainWrapper' style={{ backgroundImage: `url(${blobSVG})`, backgroundSize: "cover"}}>
          <div className='todosWrapper' style={{ backgroundImage: `url(${bgFooter})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
          <div className="container d-flex align-items-center flex-column floatWrapper">
            <div className='p-4'>
              <div className='todoFormWrapper'>
                <AddTodo onTodoAdd={this.retrieveTodos}></AddTodo>
              </div>
            </div>
              
            <div>
              <ListGroup className='todoListGroupWrapper'>
              {todos.map((todo) =>
                  <ListGroupItem className='todoItemWrapper' key={todo.id}>
                      <div className='row'>
                          <div className='col-sm-11'>
                            <div className='wrap-text'>
                              {todo.title}
                            </div>
                          </div>
                          <div className='col-sm-1 d-flex justify-content-end'>
                            <FormCheck type='switch' id={todo.id} onClick={this.getTodo} defaultChecked={todo.state} onChange={e => this.handleChange(e)}></FormCheck>
                            {/* <div style={{margin: "0 0 5px 10px"}}><a href='#'><TiDelete/></a></div> */}
                            <Button className='btn btn-danger btn-sm' id={todo.id} style={deleteSingleTodoBtn} onClick={this.deleteTodo}><FiDelete style={{marginBottom: "3px"}} /></Button>
                            </div>
                      </div>
                  </ListGroupItem>
              )}
              </ListGroup>
            </div>

            <div className='delete-button'>
              <DeleteTodos onTodosDeleted={this.retrieveTodos} buttonStyle={footerDeleteBtn}></DeleteTodos>
              <Button onClick={this.deleteCheckedTodos} style={footerDeleteBtn}>Delete Checked</Button>
            </div>
          </div>
        </div>
        </div>
    )
  }
}
