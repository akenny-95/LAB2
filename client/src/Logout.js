import { useContext } from 'react'
import { StateContext } from './contexts'

export default function Logout() {
    const {state, dispatch: dispatchUser} = useContext(StateContext);
    const {user} = state;

    return (
        <form onSubmit={ (e) => {
            e.preventDefault();
            dispatchUser({type: "LOGOUT"});
            document.getElementById('createTodo').style.display="none";
        }}>
        Logged in as: <b>{user.username}</b>

        <input 
         type="submit" 
         value="Logout"
         />
        </form>
    )
}