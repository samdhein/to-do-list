import React from 'react';

const Todo = (props) => {
    const todoClasses = ["bold", "italic"]; //because this is an array, can conditionally add multiple classes
        if(props.todo.complete) {
          todoClasses.push("line-through"); 
        }
  return (
    <div>
    <input onChange={(event) => {
        props.handleToggleComplete(props.i);
    }} checked={props.todo.complete} type="checkbox" />
    <span className={todoClasses.join(" ")}>{props.todo.text}</span>
    <button onClick={(event) => {
        props.handleDelete(props.i);
    }}
    style={{marginLeft: "5px"}}>Delete</button>
    </div>
  );
}

export default Todo;
