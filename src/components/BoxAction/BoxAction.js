import "./BoxAction.scss"

export default function BoxAction({side, state}) {

  let defenseAction = "";

  if (isNaN(state.action[0])) {
    defenseAction = "box-action__defense"
  }

  return (
    <div className={`box-action ${defenseAction} box-action__${side} box-action--${state.anim}`}>
      <div className="box-action__flex">
        {state.action}
      </div>
    </div>
  )
}