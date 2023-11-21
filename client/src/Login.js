import { useState, useContext, useEffect } from "react";
import { StateContext } from './contexts';
import { useResource } from "react-request-hook";

export default function Login() {
    const [username, setUsername] = useState(""); 
    const [loginFailed, setLoginFailed] = useState(false);
    const [password, setPassword] = useState("");

    const {state, dispatch: dispatchUser} = useContext(StateContext);

    const [user, login] = useResource((username, password) => ({
      url: "/auth/login",
      method: "POST",
      headers: { Authorization: `${state.user.access_token}` },
      data: {username, password}
    }));
    
    useEffect(() => {
        if (user && user.isLoading === false && (user.data || user.error)) {
          if (user.error) {
            setLoginFailed(true);
          } else {
            setLoginFailed(false);
            dispatchUser({ type: "LOGIN", username: username,access_token: user.data.access_token });
            document.getElementById('createTodo').style.display="block";
          }
        }
    }, [user, username, dispatchUser]);

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