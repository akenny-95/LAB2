import { useContext, useState } from "react";
import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";

export default function CreateTodo () {
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
 
    const {state, dispatch: dispatchTodo} = useContext(StateContext);
    const {user} = state;

    const [todo, createTodo] = useResource(({title, description, author, complete, dateCreated, dateCompleted}) => ({
        url: "/todos",
        method: "POST",
        data: {title, description, author, complete, dateCreated, dateCompleted}
    }));

    function handleTitle (evt) { setTitle(evt.target.value) };
    function handleDescription (evt) { setDescription(evt.target.value) };
    
    function handleCreate() {
        const dateCreated = new Date(Date.now()).toLocaleString();
        const newTodo = { title, description, author: user, complete: false, dateCreated, dateCompleted: ""};
        createTodo(newTodo);

        if (title) {
            dispatchTodo ({type: "CREATE_TODO", ...newTodo});
        }
    };

    return (
        <body>
            <form 
                id="createTodo"
                onSubmit={(e) => {
                    e.preventDefault()
                    handleCreate();
                }
            }>
                <div> Author: <b>{user}</b> </div>
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
        </body>
    );
}
