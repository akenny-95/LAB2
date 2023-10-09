import UserBar from "./UserBar";
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";
import React, { useState } from "react";

function App() {
  const initialTodos = [
    {
    title: "Get groceries 10/05", 
    description: "Pickles, Bread, Cheese, Turkey", 
    author: "Avery",
    complete: false,
    dateCreated: (new Date(Date.now())).toLocaleString()
    },
    {title: "Homework", 
    description: "finish the last section", 
    author: "Leslee",
    complete: false,
    dateCreated: (new Date(Date.now())).toLocaleString()
    },
    {title: "Break down boxes and take to recycling", 
    description: "", 
    author: "Brandi",
    complete: true,
    dateCreated: (new Date(Date.now())).toLocaleString()
    },
  ];
    
  //utilize State to monitor changes for user and list of Todos
  const [user, setUser] = useState("");
  const [todos, setTodos] = useState(initialTodos);

  const handleAddTodo = (newTodo) => { setTodos([newTodo, ...todos]); };

  return (
    <div>
      <UserBar user={user} setUser={setUser} />
      <CreateTodo user={user} handleAddTodo={handleAddTodo} />
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
