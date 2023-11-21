import { useContext, useEffect, useState } from "react";
import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";

export default function CreateTodo () {
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    
    const {state, dispatch: dispatchTodo} = useContext(StateContext);
    const {user} = state;

    const [todo, createTodo] = useResource(({title, description, author, complete, dateCreated, dateCompleted}) => ({
        url: "/todo",
        method: "POST",
        headers: { Authorization: `${state.user.access_token}` },
        data: {title, description, author, complete, dateCreated, dateCompleted}
    }));

    function handleTitle (evt) { setTitle(evt.target.value) };
    function handleDescription (evt) { setDescription(evt.target.value) };
    function handleCreate() {
        const dateCreated = new Date(Date.now()).toLocaleString();
        const newTodo = { title, description, author: user.username, complete: false, dateCreated, dateCompleted: ""};
        createTodo(newTodo);
    };

    useEffect(() => {
        if (todo.isLoading === false && todo.data) {
            if (title) {
                dispatchTodo ({
                    type: "CREATE_TODO",
                    title: todo.data.title,
                    description: todo.data.description,
                    author: user.username, 
                    complete: todo.data.complete, 
                    dateCreated: todo.data.dateCreated,
                    dateCompleted: todo.data.dateCompleted, 
                    _id: todo.data._id,
                });
            }
        }
    }, [todo]);

    return (
        <form 
            id="createTodo"
            onSubmit={(e) => {
                e.preventDefault()
                handleCreate();
            }
        }>
            <div> Author: <b>{user.username}</b> </div>
            <div>
                <label htmlFor="create-title">Title: </label> 
                <input 
                type="text" 
                value={title} 
                onChange={handleTitle} 
                name="create-title"  
                id="create-title" 
                />
            </div>
            <div>
                <textarea 
                    value={description} 
                    onChange={handleDescription} 
                />
            </div>

            <input 
            type="submit" 
            value="Create" 
            disabled={title.length === 0}
            />
        </form>

    );
}
