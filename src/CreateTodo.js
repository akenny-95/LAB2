import { useState } from "react";

export default function CreateTodo ({user, dispatchTodo}) {
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
 
    function handleTitle (evt) { setTitle(evt.target.value) };
    function handleDescription (evt) { setDescription(evt.target.value) };
    function handleCreate () {
        const newTodo = { title, description, author: user };
        
        if (title) { 
            dispatchTodo({type: "CREATE_TODO", ...newTodo});
        }   
    };

    return (
        <form 
            id="createTodo"
            display="none"
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

            <textarea 
             value={description} 
             onChange={handleDescription} 
            />

            <input 
             type="submit" 
             value="Create" 
             disabled={title.length === 0}
            />
        </form>
    );
}
