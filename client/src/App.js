import React, { useEffect, useReducer } from "react";

import UserBar from "./UserBar";
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";
import SetDisplay from "./SetDisplay";
import appReducer from "./reducers";

import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: [],
  });
  
  const [todoResponse, getTodos] = useResource(() => ({
    url: "/todo",
    method: "GET",
    headers: { Authorization: `${state.user.access_token}`},
  }));

  useEffect(() => {
    getTodos();
  }, [state.user.access_token]);

  useEffect(() => {
    if (todoResponse && todoResponse.isLoading === false && todoResponse.data) {
      dispatch({ type: "FETCH_TODOS", todos: todoResponse.data.reverse() });
    } 

    if (!state.user) { //at initial load, or after Logout (no user? no todos)
      dispatch({ type: "FETCH_TODOS", todos: "" });
    }
  }, [todoResponse, state.user]);

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