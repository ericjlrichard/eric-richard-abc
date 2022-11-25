import { useState, useEffect } from "react"
import { getSessionSettings } from "../../js/user-utils"

export default function Settings() {
  const [userSettings, setUserSettings] = useState(undefined)

  useEffect(() => {
    let userSettingsTemp = getSessionSettings();

    setUserSettings(userSettingsTemp)
    console.log(userSettingsTemp)
  }, [])

  return !!userSettings && (
    <div>
      Here be settings my brother
    </div>
  )
}