import React, { useEffect, useReducer } from "react";

import UserBar from "./UserBar";
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";
import SetDisplay from "./SetDisplay";

import appReducer from "./reducers";
import { ThemeContext, StateContext } from "./contexts";
import { useResource } from "react-request-hook";

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: [],
  });
  
  const [todoResponse, getTodos] = useResource(() => ({
    url: '/todos',
    method: 'get'
  }));

  useEffect(getTodos, []);

  useEffect(() => {
    if (todoResponse && todoResponse.data) { 
      dispatch({type: "FETCH_TODOS", todos: todoResponse.data.reverse()})
    }
  }, [todoResponse])

  return (
    <div>
      <StateContext.Provider value = {{state, dispatch}}>
        <SetDisplay />
        <UserBar />
        <CreateTodo /> 
        <TodoList />
      </StateContext.Provider>
    </div>
  );
}

export default App;