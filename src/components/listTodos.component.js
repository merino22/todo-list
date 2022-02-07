import React, { Component, useEffect, useState } from "react";
import todoService from "../services/todo.service";

import 'bootstrap/dist/css/bootstrap.min.css';
import { FormCheck, ListGroup, ListGroupItem } from 'react-bootstrap';

export default class TodosList extends Component {
    constructor(props) {
        super(props);
        this.retrieveTodos = this.retrieveTodos.bind(this);
        this.state = {
            todos: props.todosData
        };
    }

    componentDidMount() {
        this.retrieveTodos();
    }

    handleChange = (event) => {
        const todosx = event.target;
        console.log(todosx);
        this.setState({todos: todosx});
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
            <div className="container" onChange={this.handleChange}>
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