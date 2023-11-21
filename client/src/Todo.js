import { useContext, useEffect, useState } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "./contexts";

export default function Todo ({ title, description, author, complete, dateCreated, dateCompleted, _id }) {    
    const [ checkbox, setCheckbox ] = useState("");

    const {state, dispatch: dispatchTodo} = useContext(StateContext);
    const {user, todos} = state;

    const [todo, toggleTodo] = useResource((_id, complete, dateCompleted) => ({
        url: `/todo/${_id}`,
        method: "PATCH",
        headers: { Authorization: `${state.user.access_token}`},
        data: {complete, dateCompleted}
    }));

    function handleToggle (evt) {
        setCheckbox(evt.target.value)

        if (complete === false)  { //checkbox clicked to make check - previous state is false or unchecked
            complete=true;
            dateCompleted = new Date(Date.now()).toLocaleString();
        }
        else {  //checkbox clicked to remove check - previous state is true or checked
            complete=false;
            dateCompleted = "";
        }

        const cb = document.querySelector(("#cbox_"+_id));
        cb.setAttribute("checked", complete);

        const thisTodo = ({title, description, author, complete, dateCreated, dateCompleted, _id});
        toggleTodo(_id, complete, dateCompleted); 
        dispatchTodo({type: "TOGGLE_TODO", todos, ...thisTodo});
    };

    const [oldTodo, deleteTodo] = useResource((_id) => ({
        url: `/todo/${_id}`,
        method: "DELETE",
        headers: { Authorization: `${state.user.access_token}` }
    }));

    function handleDelete() { 
        deleteTodo(_id); 
    };

    useEffect(() => {
        if (oldTodo && oldTodo.isLoading === false && oldTodo.data) {
            dispatchTodo({type: "DELETE_TODO", todos, _id});
        }
    }, [oldTodo, dispatchTodo, todos, _id]);

    return (
        <form>
            <div>
                <h3>
                    <input
                        className="checkboxes"
                        id={"cbox_"+_id}
                        type="checkbox" 
                        value={complete}
                        onChange={handleToggle}  
                        checked={complete}
                    /> 
                    {title} 
                    <input 
                        className="delete_buttons"
                        id={"delete_button_"+_id}
                        type="button" 
                        value="Delete" 
                        onClick={handleDelete}
                    />
                </h3>
                <div> {description} </div> <br/>
                <i> 
                    Posted by <b>{user.username}</b> on <b>{dateCreated}</b> <br/> 
                    Completed on <b>{dateCompleted}</b> 
                </i>
            </div> 
        </form>
    );
}
