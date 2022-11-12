import "./Stats.scss"


export default function Stats (userInfo) {

  //I don't know why this is happening?!
  userInfo = userInfo.userInfo

  return (
    <div className="stats">
      <div className="stats__item">Total workouts completed: {userInfo.workouts}</div>
      
      <div className="stats__item">Total minutes of workout: {userInfo.workout_minutes}</div>
      <div className="stats__item">Southpaw workouts: {userInfo.southpaw_workouts}</div>
      <div className="stats__item">Orthodox workouts: {userInfo.orthodox_workouts}</div>
      <div className="stats__item">Random workouts: {userInfo.random_workouts}</div>
      <div className="stats__item">Classic workouts: {userInfo.classic_workouts}</div>
      <div className="stats__item">Signature workouts: {userInfo.signature_workouts}</div>
      <div className="stats__item">Random rounds: {userInfo.random_rounds}</div>
      <div className="stats__item">Classic rounds: {userInfo.classic_rounds}</div>
      <div className="stats__item">Signature rounds: {userInfo.signature_rounds}</div>
      
      
      
      
    </div>
  )
}