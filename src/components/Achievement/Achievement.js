import "./Achievement.scss";
import { returnAchievementDescription, determineNextTier } from "../../js/user-utils"

const tierNames = ["none", "bronze", "silver", "gold", "platinum"]

export default function Achievement({achievement, userInfo}) {

  const tierIndex = determineNextTier(achievement, userInfo)

  return (
    <div key={achievement.id} className={"achievement achievement__" + tierIndex} title={tierNames[tierIndex]}>
      <div className="achievement__trophy">
        <img className={"achievement__image achievement__image--" + tierIndex} alt="Boxing Glove" src={require("../../assets/images/boxing-glove.png")}></img>
      </div>
      <div className="achievement__name">
        {achievement.name}
      </div>
      <div className="achievement__description">
        {returnAchievementDescription(achievement, userInfo)}
      </div> 
    </div>
  )
}