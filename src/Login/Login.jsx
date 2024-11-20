import { Link, useNavigate} from 'react-router-dom'
import React, { useState } from 'react'
import app from './firebase'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import './Login.css'


const Login =()=> {
    const auth = getAuth(app);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate() // New change in react v6. use navigate is used instead of use history.

    const handleSubmit = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then(() =>{
            setEmail("");
            setPassword("");
            alert("Login successful !");
            navigate('/');
        }).catch ((error) => {
        alert(error)
        });
    }

    return(
        <div>
            <form className='login-form' onSubmit={handleSubmit}> 
            <Link to="/SignUp" className='signup-link'>Sign up</Link><br></br>
            <label htmlFor='email'>
                Email: <br></br>
                <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
            </label><br></br>
            <label htmlFor='password'>
                Password: <br></br>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </label><br></br>
            <button type='submit'>Login</button>
        </form>
        </div>
    );
}
export default Login;