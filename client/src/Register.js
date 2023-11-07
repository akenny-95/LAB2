import { useState, useEffect, useContext } from "react";
import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";

export default function Register () {
    const {dispatch: dispatchUser} = useContext(StateContext);
    
    const [user, register] = useResource((username, password) => ({
        url: "/users",
        method: "POST",
        data: {email: username, password}
    }));

    useEffect(() =>{
        if (user && user.data) {
            dispatchUser({type:"REGISTER", username: user.data.user.email});
        }
    }, [user, dispatchUser]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    
    function handleUsername (evt) {setUsername(evt.target.value)};
    function handlePassword (evt) {setPassword(evt.target.value)};
    function handlePasswordRepeat (evt) {setPasswordRepeat(evt.target.value)};

    return (
        <form onSubmit={ (e) => {
             e.preventDefault();
             const myUser = (username, password);
             register(myUser);
             dispatchUser({type:"REGISTER", username});

             document.getElementById('createTodo').style.display="block";
            }}>

            <label htmlFor="register-username">Username: </label>
            <input 
             type="text" 
             name="register-username" 
             id="register-username" 
             value={username}
             onChange={handleUsername}
            /> <br />

            <label htmlFor="register-password">Password: </label>
            <input 
             type="password" 
             name="register-password" 
             id="register-password" 
             value={password}
             onChange={handlePassword}
            /> <br />

            <label htmlFor="register-password-repeat">Repeat password: </label>
            <input 
             type="password" 
             name="register-password-repeat" 
             id="register-password-repeat" 
             value={passwordRepeat}
             onChange={handlePasswordRepeat}
            /> <br />

            <input 
             type="submit" 
             value="Register" 
             disabled= {
                username.length === 0 ||
                password.length === 0 ||
                password !== passwordRepeat 
             } 
            />
        </form>
    )
}
