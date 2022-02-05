import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, } from "react-bootstrap";

const AddTodo = () => {
    
    const initialTodoState = {
        name: "",
        completed: false
    };
    
    const [todo, setTodo] = useState(initialTodoState);
    const [name, setName] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        if(!name)
            return;
        
        //createTodo(name);
        setName("");
    }

    return(
        <div className="container" style={{width: "50%"}}>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Create Todo</Form.Label>
                    <Form.Control type="text" className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Create Todo"></Form.Control>
                </Form.Group>
                <Button type="submit" style={{marginTop: "3vh"}}>
                    Create
                </Button>
            </Form>
        </div>
    )
}

export default AddTodo;