import { useContext, useState } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "./contexts";

export default function Todo ({ title, description, author, complete, dateCreated, dateCompleted, id }) {    
    const [ checkbox, setCheckbox ] = useState("");
    const {state, dispatch: dispatchTodo} = useContext(StateContext);
    const {todos} = state;

    const [todo, toggleTodo] = useResource((id, {title, description, author, complete, dateCreated, dateCompleted}) => ({
        url: `/todos/${id}`,
        method: "PUT",
        data: {title, description, author, complete, dateCreated, dateCompleted}
    }));

    const [oldTodo, deleteTodo] = useResource((id) => ({
        url: `/todos/${id}`,
        method: "DELETE"
    }));

    function handleCheckbox (evt) {
        setCheckbox(evt.target.value)

        if (complete === false)  { //checkbox clicked to make check - previous state is false or unchecked
            complete=true;
            dateCompleted = new Date(Date.now()).toLocaleString();
        }
        else {  //checkbox clicked to remove check - previous state is true or chccked
            complete=false;
            dateCompleted = "";
        }

        const cb = document.querySelector(("#cbox_"+id));
        cb.setAttribute("checked", complete);

        const thisTodo = ({title, description, author, complete, dateCreated, dateCompleted, id});
        toggleTodo(id, thisTodo); 
        dispatchTodo({type: "TOGGLE_TODO", todos, ...thisTodo});
    };

    function handleDelete() { 
        deleteTodo(id); 
        dispatchTodo({type: "DELETE_TODO", todos, id});
        
    };

    return (
        <form id={id} >
            <div>
                <h3>
                    <input
                        className="checkboxes"
                        id={"cbox_"+id}
                        type="checkbox" 
                        value={complete}
                        onChange={handleCheckbox}  
                        checked={complete}
                    /> 
                    {title} 
                    <input 
                        className="delete_buttons"
                        id={"delete_button_"+id}
                        type="button" 
                        value="Delete" 
                        onClick={handleDelete}
                    />
                </h3>
                <div> {description} </div> <br/>
                <i> 
                    Posted by <b>{author}</b> on <b>{dateCreated}</b> <br/> 
                    Completed on <b>{dateCompleted}</b> 
                </i>
            </div> 
        </form>
    );
}
