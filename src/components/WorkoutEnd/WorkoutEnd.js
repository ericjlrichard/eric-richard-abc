import "./WorkoutEnd.scss";
import { Link } from "react-router-dom";

export default function WorkoutEnd() {


  return (
    <div className="workout-end">
        <h1 className="workout-end__title">Congrats!</h1>
        <p>You did it you magnificent beast!</p>
        <Link className="workout-end__link" to="/"><button className="workout-end__button">Back to Main</button></Link>
        <img className="workout-end__img" src={require("../../assets/images/belt.png")} alt="Boxing Belt" />

        
    </div>
  )
  
}