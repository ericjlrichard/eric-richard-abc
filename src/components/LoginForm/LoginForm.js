

export default function SignUpForm({handleLoginSubmit}) {


  return (
    <div className="account__form-container">
      <form id="login-form" className="account__signup-form" onSubmit={handleLoginSubmit} >
        <label htmlFor="login_email">Handle: </label><input name="login_handle" id="login_handle" type="text" required></input>
        <label htmlFor="login_password">Password: </label><input name="login_password" id="login_password" type="password" required></input>
        <button className="account__button">Log In</button>
      </form>
    </div>
  )
}