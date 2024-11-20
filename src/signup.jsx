import React, { useState } from "react";
import './signup.css';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "./firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [conf, setConf] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (pass !== conf) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: name
        });
        setMessage("User registered successfully");
        setIsRegistered(true);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user already exists in Firestore, if not, add them
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        name: user.displayName
      });
      setMessage("User logged in with Google successfully");
      setIsRegistered(true);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h3>Create Your Account</h3>
      <form onSubmit={handleSignUp}>
        <div className="input-group">
          <label>Name*</label>
          <input
            type="text"
            className="input-field"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Email*</label>
          <input
            type="email"
            className="input-field"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password*</label>
          <input
            type="password"
            className="input-field"
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Confirm Password*</label>
          <input
            type="password"
            className="input-field"
            onChange={(e) => setConf(e.target.value)}
            required
          />
        </div>
        <button className="signup-btn">Sign Up</button>

        {message && <p className="message">{message}</p>}
        {isRegistered && <p className="success-message">Registration successful.</p>}

        <p className="redirect-text">
          Already a User? <Link to="/login">Log In here!</Link>
        </p>
      </form>

      {/* Google Sign In Button */}
      <div className="google-signin-btn">
        <button onClick={handleGoogleSignIn} className="google-btn">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo" className="google-logo" />
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default SignUp;
