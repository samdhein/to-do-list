import './App.css';
import React, { useState } from 'react';
import Todo from './components/Todo'

//note for instructor: I relied on the Demo to get through this one.

function App() {
  // demo: state creates an array with positions 0 and 1, the below syntax destructures it. 
  // array consists of item (current value) and way to update it.
  // calls a function that returns two items.
  // empty starting value ("")

  // this is for the input box
  const [newTodo, setNewTodo] = useState("");

  // this is for the array of todo item list
  // default to empty array or null. empty array helps because if you try to map an empty array, won't break. will break if you map null.
  // useful later with API calls to help determine between empty array returned and empty starting array. 
  // but using null, must have an if-check so you don't try to map it and break.
  const [todos, setTodos] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();   // prevents default behavior, in this case entire page refreshing.
    if (newTodo.length === 0) { // prevents submission of blank entries
      return;
    }

    const todoItem = {  // turn todoItem into an object to track complete or not. 
      text: newTodo,
      complete: false
    };

    console.log(newTodo);
    // todos.push(newTodo); do not mutate state directly; relies on something else to re-render. instead, use setTodos.
    setTodos([...todos, todoItem]); // when dealing with non-primitive data types (like objects or arrays) must be passed into a new (object or array).
    // this array preserves existing todos, and adds new todo. the ... spread operator separates array into its constituent parts as CSV. 
    // creates a new array. spread operator works on empty arrays.
    // updated with todoItem to track checkbox... passing object instead of string. reference below changed to todo.text
    setNewTodo(""); //this sets newTodo to an empty string in state, enabling the input to clear after submission. two-way data minding.
  };

  const handleDelete = (delIndex) => {
    const filteredTodos = todos.filter((todo, i) => {
      return i != delIndex;
    });

    setTodos(filteredTodos);
  }

  const handleToggleComplete = (idx) => {  //checkbox functionality
    const updatedTodos = todos.map((todo, i) => {
      if (idx === i) { //if idx = index of item, change todo.complete to opposite 
        todo.complete = !todo.complete;
      }
      return todo; // otherwise return as-is
    });
    setTodos(updatedTodos);  //setTodos to updatedTodos.
  }

  return (
    <div style={{textAlign: "center"}}>
      <form onSubmit={(event) => {
        handleSubmit(event);
      }}>
        <input onChange={(event) => {
          setNewTodo(event.target.value);
        }} type="text"
           value={newTodo} />
        <div>
          <button>Add</button>
        </div>
      </form>
      {todos.map((todo, i) => {
        
          return <Todo 
          key={i}
          i={i}
          todo={todo} 
          handleToggleComplete={handleToggleComplete}
          handleDelete={handleDelete}
          />;
        })}
    </div>
  );
}

export default App;
