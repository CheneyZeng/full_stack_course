import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({show, setPage}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login] = useMutation(LOGIN, {
		onError: error => {
			console.log(error.graphQLErrors[0].message)
		},
	})

	if (!show) {
		return null
	}

  const submit = async (event) => {
    event.preventDefault()
    const result = await login({
      variables: { username, password },
    })

    if (result.data.login !== null) {
      const token = result.data.login.value
      localStorage.setItem("library-user-token", token)
      localStorage.setItem("favorite-genre", result.data.login.favoriteGenre)
      setPage("authors")
    } else {
      console.log("Wrong credentials")
    }
    setUsername("")
		setPassword("")
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm