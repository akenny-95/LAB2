import { useContext } from "react";
import Todo from "./Todo";
import {v4 as uuidv4} from "uuid";
import { StateContext } from "./contexts";

export default function TodoList () {
    const {state} = useContext(StateContext);
    const {todos} = state;

    return (
        <div>
            {todos.length === 0 && <h2>No todos found.</h2>}
            {todos.length > 0 &&
                todos.map((t, i) => ( <Todo {...t} key={uuidv4()} /> )
            )}
        </div>
    );
}
