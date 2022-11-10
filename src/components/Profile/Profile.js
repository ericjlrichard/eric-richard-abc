import { useState, useEffect } from "react"
import axios from "axios"

const API_URL = process.env.REACT_APP_SERVER_URL;

export default function Profile() {
  const [userInfo, setUserInfo] = useState(undefined)
  

  useEffect(() => {
    const abcToken = sessionStorage.getItem("abc_token")

    axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${abcToken}`
      }
    })
    .then(res => {
      setUserInfo(res.data)
    })
    .catch(err => {
      console.log(err)
    })
     
  }, [])

  return !!userInfo && (
    <div>
      <h1>{userInfo.handle} - Profile</h1>
    </div>
  )
}