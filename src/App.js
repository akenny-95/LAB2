import UserBar from "./UserBar";
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";
import React, { useReducer } from "react";

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

  function userReducer(state, action) {
    switch (action.type) {
      case "LOGIN":
      case "REGISTER":
        return action.username;
      case "LOGOUT":
        return "";
      default:
        return state; 
    }
  }

  const [user, dispatchUser] = useReducer(userReducer, "");

  function todoReducer(state, action) {
    switch (action.type) {
      case "CREATE_TODO":
        const newTodo = {
          title: action.title,
          description: action.description,
          author: action.author,
          complete: false, 
          dateCreated: (new Date(Date.now())).toLocaleString(),
        };
        return [newTodo, ...state];
      /*
      case "TOGGLE_TODO": //TODO - locate spec todo in list, toggle complete field and set datecompleted field 
        const toggledTodo = {
          title: action.title,
          description: action.description,
          author: action.author,
          complete: action.complete, 
          dateCreated: action.dateCreated,
          dateCompleted: action.dateCompleted,
        };
      

        return [toggledTodo, ...state];
     case "DELETE_TODO": //TODO - remove spec todo from the list 
        const deletedTodo = {
          title: action.title,
          description: action.description,
          author: action.author,
          complete: action.complete, 
          dateCreated: action.dateCreated,
        };
        return [action.todos];
      */
      default:
        return state;
    }
  }

  const [todos, dispatchTodo] = useReducer(todoReducer, initialTodos);

  return (
    <div>
      <UserBar user={user} dispatchUser={dispatchUser}/>
      <CreateTodo user={user} dispatchTodo={dispatchTodo}/> 
      <TodoList todos={todos} dispatchTodo={dispatchTodo}/>
    </div>
  );
}

export default App;
