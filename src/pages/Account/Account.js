import "./Account.scss"

import "../../styles/partials/_colors.scss"

import { scramblePassword, verifySignUpForm } from "../../js/user-utils";

import { useState, useEffect } from "react";

import LoginForm from "../../components/LoginForm/LoginForm";
import Profile from "../../components/Profile/Profile";

import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL;

export default function Account()  {
  const [loggedIn, setLoggedIn] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("abc_token")

    if (sessionToken) {
      setLoggedIn(true)
      setSignedUp(true)
    }
  }, [])

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const signUpFormValidation = verifySignUpForm(event.target);

    if (signUpFormValidation === "OK") {

      const signUp = async () => {
        try {
          const res = await axios.post(`${API_URL}/signup`, {
            handle: event.target.handle.value,
            password: scramblePassword(event.target.password.value),
            email: event.target.email.value
          })

          window.alert("Account created successfully! Let us log you in...")

          axios.post(`${API_URL}/login`, {
            username: event.target.handle.value,
            password: scramblePassword(event.target.password.value)
          })
          .then(res => {
            setLoggedIn(true)
            sessionStorage.setItem("abc_token", res.data.token)
          })
          .catch(err => {
            console.log(err)
          })
          
        } catch (err) {
          window.alert(err.response.data)
        }
      }

      signUp()


    } else {
      //if validation was not OK, tell the user what's up
      window.alert(signUpFormValidation)
    }
    
  }

  if (!loggedIn) {
    return (
      <div className="account">
        
        <p>Seems you don't have an account! Wanna sign in?</p>
        <p>We'll only ask you for an email and a password, <i>maybe</i> a handle. (OK definitely a handle, they're rad - make sure to pick something cool like SteveTheHammer)</p>
  
        <p>With an account, you'll be able to:</p>
  
        <ul>
          <li>save your workout preferences</li>
          <li>accumulate stats such as workouts completed, total time spent working out, combos tried </li>
          <li>earn accomplishments - who doesn't like little badges?</li>
        </ul>
  
        <LoginForm signup="true" handleFormSubmit={handleFormSubmit} />
        
  
      </div>
    )
  }

  return (
    <div className="account">
      
      <Profile />
      

    </div>
  )
}