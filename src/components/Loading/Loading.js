import "./Loading.scss"


export default function Loading({loadMessage}) {



  return (
    <div className="loading">
      <img className="loading__image" src={require("../../assets/images/loading.gif")} alt="Loading.." />
      {loadMessage}
    </div>
  )
}