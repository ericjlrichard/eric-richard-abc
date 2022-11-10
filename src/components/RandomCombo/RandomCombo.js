
import { getRandom } from "../../js/math-utils"
import { translateComboString } from "../../js/combo-utils"
import { useEffect, useState } from "react"

const adjectives = ["sweet", "great", "neat", "awesome", "cunning", "powerful", "nice", "energetic", "smooth", "satisfying", "ultra-fine"]

export default function RandomCombo({combosArray, round, actionsArray, boxersArray, featuredCombo}) {
  

  return !!featuredCombo && (
    <div className="round-modal__combo">
          Next round features this combo from {boxersArray.find(item => item.id === featuredCombo.boxer_id).nickname + " " + boxersArray.find(item => item.id === featuredCombo.boxer_id).last_name}:<br></br><br></br>
          {translateComboString(featuredCombo.combo_string, actionsArray)}
          
          
          <img className="round-modal__img" src={require("../../assets/" + boxersArray.find(item => item.id === featuredCombo.boxer_id).img)} alt="Boxer Profile" title={boxersArray.find(item => item.id === featuredCombo.boxer_id).description} />

        </div>
  )
}