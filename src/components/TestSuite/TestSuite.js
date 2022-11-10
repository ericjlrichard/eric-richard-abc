import "./TestSuite.scss"

import {checkRandomizer, getRandom, getRandomFromRange, getSkewedRandom, getSkewedFromArrays} from "../../js/math-utils.js";
import { useState } from "react";

import { createRandomCombo } from "../../js/combo-utils";

import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080"

export default function TestSuite() {
  //start with the test suite off
  const [showToggle, setShowToggle] = useState(false)

  const handleRollBack = (event) => {
    //roll back database to original seed values

  }

  const handleSelectChange =(event) => {
    window.open(event.target.value, "_blank").focus();
  }
  
  const handleClickRandom =(event) => {
    const testArray=["a","b","c","d","e","f","g","h","i","j"]
    const testArraySkewed=["a", "b", "c"];
    const testArrayUnSkewed=["d","e","f","g","h","i","j"]
    const numTests = 1000;
    let resultsArray = []

    console.log("constructing random array...")
    //getting randoms
    for (let i = 0; i<numTests; i++) {
      resultsArray.push(getRandom(testArray))
    }

    for (let i = 0; i < numTests; i++) {
      console.log("Raw results", resultsArray.join())
    }
    
    console.log("Analyzing...")
    
    console.log("Random - Analysis", checkRandomizer(testArray, resultsArray))

    console.log("Analyzing skewed random...")

    resultsArray = []

    for(let i = 0; i < numTests; i++) {
      resultsArray.push(getSkewedRandom(testArray, [1, 4], 90))
    }

    console.log("SKewed random at 90% - Analysis", checkRandomizer(testArray, resultsArray))

    resultsArray = []
    console.log("checking random range...")

    for (let i=0; i < 1000; i++)
      resultsArray.push(getRandomFromRange(2, 7))

    console.log("Random from 2 to 7", resultsArray)
    console.log("Random range - analysis", checkRandomizer([2, 3, 4, 5, 6, 7], resultsArray))

    resultsArray = []
    console.log("testing getSkewedFromArrays...")

    for (let i=0; i < 1000; i++) {
      resultsArray.push(getSkewedFromArrays(testArrayUnSkewed, testArraySkewed, 90 ))
    }

    console.log("skewedFromArrays at 90%", checkRandomizer(testArray, resultsArray))
  }

  const handleClickRandomCombo = () => {
    axios.get(`${API_URL}/actionswithtypes`)
    .then(res => {
    
      const actions = res.data

      console.log(createRandomCombo(actions, 2, 2))
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleClickShow = (event) => {
    setShowToggle(!showToggle)
  }

  const handleClickAutoFill = (event) => {
    const signupForm = document.getElementById("signup-form");

    if (signupForm) {
      signupForm.handle.value = "SteveTheHammer"
      signupForm.email.value = "steve@thehammer.com"
      signupForm.password.value = "SteveTheHammer"
      signupForm["confirm-password"].value = "SteveTheHammer"
    }
  }

  if (!showToggle) {
    return (
      <div className="test--hide" onClick={handleClickShow}>Show</div>
    )
  }

  return (
    <div className="test">
      <div onClick={handleClickShow}>Hide</div>
      <button title="Rolls back all data to original files" className="test__button" onClick={handleRollBack}>Roll Back</button>
      <select title="check on axios calls" onChange={handleSelectChange}className="test__button" >
        <option>ABC API</option>
        <option value={`${API_URL}/boxers`} >GET all boxers</option>
        <option value={`${API_URL}/combos`} >GET all combos</option>
        <option value={`${API_URL}/actions`} >GET all actions</option>
        <option value={`${API_URL}/actions`} >GET all actions with types</option>
      </select>
      <button className="test__button" onClick={handleClickAutoFill}>Autofill</button>

      <button className="test__button" onClick={handleClickRandom}>Maths Check</button>

      <button className="test__button" onClick={handleClickRandomCombo}>Random Combo</button>
      
    </div>
    
  )
}