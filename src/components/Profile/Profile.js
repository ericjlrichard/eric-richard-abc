import "./Profile.scss";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react"
import axios from "axios"

import Achievement from "../Achievement/Achievement";
import Stats from "../Stats/Stats";
import Settings from "../Settings/Settings";

const API_URL = process.env.REACT_APP_SERVER_URL;

export default function Profile() {
  const [userInfo, setUserInfo] = useState(undefined)
  const [achievements, setAchievements] = useState(undefined)

  const navigate = useNavigate();
  

  useEffect(() => {
  
    const abcToken = sessionStorage.getItem("abc_token")
    console.log(abcToken)

    axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${abcToken}`
      }
    })
    .then(res => {
      console.log(res.data)
      // const userInfoTemp = res.data;

      // //mockup data for achievements testing
      // userInfoTemp.workout_minutes = (52*30);
      // userInfoTemp.workouts = 54;
      // userInfoTemp.southpaw_workouts = 50;
      // userInfoTemp.orthodox_workouts = 4;
      // userInfoTemp.classic_rounds = 26;
      // userInfoTemp.random_rounds = 0;
      // userInfoTemp.signature_rounds = 3;
      // userInfoTemp.classic_workouts = 0;
      // userInfoTemp.random_workouts = 0;
      // userInfoTemp.signature_workouts = 5;

      // setUserInfo(userInfoTemp)
      setUserInfo(res.data)
    })
    .catch(err => {
      console.log(err)
    })

    axios.get(`${API_URL}/achievements`)
    .then(res => {
      setAchievements(res.data)
    })
    .catch(err => {
      console.log(err)
    })
     
  }, [])

  const handleClickLogout = (event) => {

    //message modal asking if user is sure

    sessionStorage.removeItem("abc_token")
    navigate("/")
  }

  return !!userInfo && !!achievements && (
    <div>
      <div className="profile__title">
      <h1 className="profile__handle">{userInfo.handle}</h1>
      <div className="profile__logout" onClick={handleClickLogout}>Logout</div>
      </div>
      

      <details>
        <summary className="profile__section-title">Settings</summary>
        <Settings />
      </details>

      <details>
        <summary className="profile__section-title">Stats</summary>
        <Stats userInfo={userInfo} />
      </details>

      <details open>
        <summary className="profile__section-title">Achievements</summary>
        
      {
        achievements.map(item => (
          <Achievement key={item.id} achievement={item} userInfo={userInfo} />
        ))
      }
      </details>
    </div>
  )
}