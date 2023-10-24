import Todo from "./Todo";
import {v4 as uuidv4} from "uuid";

export default function TodoList ({todos = [], dispatchTodo}) {
    
    return (
        <div>
            {todos.map((t, i) => (
                <Todo todos={todos} {...t} idNum={i} dispatchTodo={dispatchTodo} key={uuidv4()} />
            ))}
        </div>
    );
}
