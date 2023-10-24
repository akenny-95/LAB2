
export default function Logout({user, dispatchUser}) {
    return (
        <form onSubmit={ (e) => {
            e.preventDefault();
            dispatchUser({type: "LOGIN"});
            document.getElementById('createTodo').style.display="none";
        }}>
        Logged in as: <b>{user}</b>

        <input 
         type="submit" 
         value="Logout"
         />
        </form>
    )
}