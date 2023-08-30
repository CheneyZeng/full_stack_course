const LoginForm = ({ handleLogin, username, handleUsername, password, handlePassword }) => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
          username
        <input
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={handleUsername}
        />
      </div>
      <div>
          password
        <input
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={handlePassword}
        />
      </div>
      <button type="submit" id="login-button">login</button>
    </form>
  </div>
)

export default LoginForm