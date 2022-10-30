import "./TestSuite.scss"
import axios from "axios"

import {checkRandomizer, getRandom, getSkewedRandom} from "../../js/math-utils.js";

const API_URL = "http://localhost:8080"
export default function TestSuite() {

  const handleRollBack = (event) => {
    //roll back database to original seed values

  }

  const handleSelectChange =(event) => {
    window.open(event.target.value, "_blank").focus();
  }
  
  const handleClickRandom =(event) => {
    const testArray=["a","b","c","d","e","f","g","h","i","j"]
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
    
    console.log("Analysis", checkRandomizer(testArray, resultsArray))

    console.log("Analyzing skewed random...")

    resultsArray = []

    for(let i = 0; i < numTests; i++) {
      resultsArray.push(getSkewedRandom(testArray, [1, 4], 50))
    }

    console.log("Analysis", checkRandomizer(testArray, resultsArray))
  }

  return (
    <div className="test">
      Test Suite 3000 
      <button title="Rolls back all data to original files" className="test__button" onClick={handleRollBack}>Roll Back</button>
      <select title="check on axios calls" onChange={handleSelectChange}className="test__button" >
        <option>ABC API</option>
        <option value="http://localhost:8080/boxers" >GET all boxers</option>
        <option value="http://localhost:8080/combos" >GET all combos</option>
        <option value="http://localhost:8080/actions" >GET all actions</option>
      </select>
      <button className="test__button">Autofill</button>

      <button className="test__button" onClick={handleClickRandom}>Random</button>
      
    </div>
    
  )
}