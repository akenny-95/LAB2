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

function todoReducer(state, action) {
    switch (action.type) {
      case "CREATE_TODO":
        const newTodo = {
          title: action.title,
          description: action.description,
          author: action.author,
          complete: action.complete, 
          dateCreated: action.dateCreated,
          dateCompleted: action.dateCompleted
        };
        return [newTodo, ...state];
      case "FETCH_TODOS":
        return action.todos;
      case "TOGGLE_TODO": 
        const tTodos = action.todos; 
        const toggledTodo = {
          title: action.title,
          description: action.description,
          author: action.author,
          complete: action.complete, 
          dateCreated: action.dateCreated,
          dateCompleted: action.dateCompleted,
          id: action.id
        };
        const toggleIndex = tTodos.indexOf(tTodos.find(todo => todo.id === toggledTodo.id));
        tTodos[toggleIndex] = toggledTodo;
        return tTodos;
     case "DELETE_TODO": 
        const dTodos = action.todos; 
        console.log(dTodos);
        const thisId = action.id;
        const deleteIndex = dTodos.indexOf(dTodos.find(todo => todo.id === thisId));
        dTodos.splice(deleteIndex, 1);
        console.log(dTodos);
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