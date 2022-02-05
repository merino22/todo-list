import React, { Component } from "react";
import todoService from "../services/todo.service";

import 'bootstrap/dist/css/bootstrap.min.css';
import { FormCheck, ListGroup, ListGroupItem } from 'react-bootstrap';

export default class TodosList extends Component {
    constructor(props) {
        super(props);
        this.retrieveTodos = this.retrieveTodos.bind(this);

        this.state = {
            todos: []
        };
    }

    componentDidMount() {
        this.retrieveTodos();
    }

    retrieveTodos() {
        todoService.getAll()
            .then(response => {
                this.setState({
                    tutorials: response.data
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
            <div>
                <ListGroup>
                {todos.map((todo) =>
                    <div>
                        <h1>{todo[0]}</h1>
                        <ListGroupItem className='todoItemWrapper' key={todo.id}>
                            <div className='row'>
                                <div className='col-md-6'>{todo.title}</div>
                                <div className='col-md-6'><FormCheck type='checkbox'></FormCheck></div>
                            </div>
                        </ListGroupItem>
                    </div>
                )}
                </ListGroup>
            </div>
        )
    }
}