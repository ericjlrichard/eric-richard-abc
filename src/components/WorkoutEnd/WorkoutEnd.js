import "./WorkoutEnd.scss";

export default function WorkoutEnd() {


  return (
    <div className="workout-end">
        <h1 className="workout-end__title">Congrats!</h1>
        <p>You did it you magnificent beast!</p>
        <img className="workout-end__img" src={require("../../assets/images/belt.png")} alt="Boxing Belt" />
    </div>
  )
  
}