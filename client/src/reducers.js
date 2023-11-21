function userReducer(state, action) {
    switch (action.type) {
      case "LOGIN":
        return {
          username: action.username,
          access_token: action.access_token,
        };
      case "LOGOUT":
        return "";
      default:
        return state; 
    }
  }

function todoReducer(state, action) {
    switch (action.type) {
      case "CREATE_TODO":
      const newTodo = {
          title: action.title,
          description: action.description,
          author: action.author,
          complete: action.complete, 
          dateCreated: action.dateCreated,
          dateCompleted: action.dateCompleted,
          _id: action._id,
        };
        return [newTodo, ...state];
      case "FETCH_TODOS":
        console.log(action.todos);
        return action.todos;
      case "TOGGLE_TODO": 
        const tTodos = action.todos.slice(0); 
        const toggledTodo = {
          title: action.title,
          description: action.description,
          author: action.author,
          complete: action.complete, 
          dateCreated: action.dateCreated,
          dateCompleted: action.dateCompleted,
          _id: action._id
        };
        const toggleIndex = tTodos.indexOf(tTodos.find((todo) => todo._id === toggledTodo._id));
        tTodos[toggleIndex] = toggledTodo;
        return tTodos;
     case "DELETE_TODO": 
        const dTodos = action.todos.slice(0); 
        const deleteIndex = dTodos.indexOf(dTodos.find((todo) => todo._id === action._id));
        dTodos.splice(deleteIndex, 1);
        return dTodos;
      default:
        return state;
    }
  }

  export default function appReducer(state, action) {
    return {
        user : userReducer(state.user, action),
        todos: todoReducer(state.todos, action),   
      };
    }