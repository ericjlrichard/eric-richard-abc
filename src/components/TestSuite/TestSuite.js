import "./TestSuite.scss"
import axios from "axios"

const API_URL = "http://localhost:8080"
export default function TestSuite() {

  const handleRollBack = (event) => {
    axios.get(API_URL + "/rollback")

    .then(response => {
      console.log("database reset")

    })

    .catch(error => {
      console.log(error)
    })

  }

  const handleSelectChange =(event) => {
    window.open(event.target.value, "_blank").focus();
  }

  return (
    <div className="test">
      Test Suite 3000 
      <button title="Rolls back all data to original files" className="test__button" onClick={handleRollBack}>Roll Back</button>
      <select title="check on axios calls" onChange={handleSelectChange}className="test__button" >
        <option>inStock API</option>
        <option value="http://localhost:8080/warehouse" >GET all warehouses</option>
        <option value="http://localhost:8080/inventory" >GET all inventories</option>
        <option value="http://localhost:8080/warehouse/2922c286-16cd-4d43-ab98-c79f698aeab0" >GET one warehouse - success</option>
        <option value="http://localhost:8080/inventory/a193a6a7-42ab-4182-97dc-555ee85e7486" >GET one inventory - success</option>
        <option value="http://localhost:8080/warehouse/1248980231" >GET one warehouse - fail</option>
        <option value="http://localhost:8080/inventory/123448" >GET one inventory - fail</option>
      </select>
      
    </div>
    
  )
}