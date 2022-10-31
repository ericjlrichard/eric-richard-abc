import "./BoxAction.scss"

export default function BoxAction({side, action, state}) {


  return (
    <div className={`box-action box-action__${side} box-action--${state.anim}`}>
      <div className="box-action__flex">
        {state.action}
      </div>
    </div>
  )
}