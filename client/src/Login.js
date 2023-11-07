import { useState, useContext, useEffect } from "react";
import { StateContext } from './contexts';
import { useResource } from "react-request-hook";

export default function Login() {
    const [username, setUsername] = useState(""); 
    const [loginFailed, setLoginFailed] = useState(false);
    const [password, setPassword] = useState("");
    const {dispatch: dispatchUser} = useContext(StateContext);

    const [user, login] = useResource((username, password) => ({
        url: "/login",
        method: "POST",
        data: {email: username, password}
    }));

    useEffect(() => {
        if (user) {
            if (user?.data?.user) {
                setLoginFailed(false);
                dispatchUser({type: "LOGIN", username: user.data.user.email});     
                document.getElementById('createTodo').style.display="block";  
            } else {
                setLoginFailed(true);
            }
        }
    }, [user, dispatchUser]);

    function handlePassword (evt) {setPassword(evt.target.value)};
    function handleUsername (evt) { setUsername(evt.target.value) } 

    return (
        <>
            {loginFailed && <span style ={{color:"red"}}>Invalid username or password</span>}
            <form onSubmit={ (e) =>{ 
             e.preventDefault()
             login(username, password);
            }}>           

            <label htmlFor="login-username">Username: </label>
            <input 
             type="text" 
             name="login-username" 
             id="login-username" 
             value={username} 
             onChange={handleUsername} 
            /> <br />

            <label htmlFor="login-password">Password: </label>
            <input 
             type="password" 
             name="login-password" 
             id="login-password" 
             value={password}
             onChange={handlePassword}
             /> <br />

            <input 
             type="submit" 
             value="Login" 
             disabled={username.length === 0} 
            />
            </form>
        </>
    )
}