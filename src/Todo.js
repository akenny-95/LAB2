import { useState } from "react";

export default function Todo ({ title, description, author, complete, dateCreated, idNum}) {    
    const [ checkbox, setCheckbox ] = useState("");
    const [ dateCompleted, setDateCompleted ] = useState("");

    function handleCheckbox (evt) {
        setCheckbox(evt.target.value);
        const cb = document.querySelector(('#cbox'+idNum));

        if (cb.checked)  {
            complete=true;
            cb.setAttribute("checked", complete);
            setDateCompleted((new Date(Date.now())).toLocaleString());
        }
        else {
            complete=false;
            cb.removeAttribute("checked", complete);
            setDateCompleted("");
        }
    };

    return (
        <form> 
            <div>
                <h3>
                    <input
                        type="checkbox" 
                        onChange={handleCheckbox} 
                        name="cbox"    
                        id={"cbox"+idNum}
                        value={complete}
                    /> 
                    {title} 
                </h3>
                <div>{description}</div>
                <br />
                <i> 
                    Written by: <b>{author}</b> <br/>        
                    Date Created: <b>{dateCreated}</b> <br/> 
                    Date Completed: <b>{dateCompleted}</b> 
                </i>
            </div> 

            <input 
             type="submit" 
             value="Delete" 
            />
        </form>
    );
}
