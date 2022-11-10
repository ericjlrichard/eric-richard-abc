

export default function LoginForm({handleFormSubmit}) {


  return (
    <div className="account__form-container">
      <form id="signup-form" className="account__signup-form" onSubmit={handleFormSubmit} >
        <label htmlFor="email">Handle: </label><input name="handle" id="handle" type="text" required></input>
        <label htmlFor="handle">Email: </label><input name="email" id="email" type="email" required></input>
        <label htmlFor="password">Password: </label><input name="password" id="password" type="password" required></input>
        <label htmlFor="password">Confirm Password: </label><input name="confirm-password" id="confirm-password" type="password" required></input>
        <button className="account__button">Register</button>
      </form>
    </div>
  )
}