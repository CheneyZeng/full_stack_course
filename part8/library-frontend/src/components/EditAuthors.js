import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const EditAuthor = ({authors}) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ Query: ALL_AUTHORS}]
  })

  const submit = (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo: Number(born) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
        <select
            value={name} onChange={e => setName(e.target.value)}
          >
          {authors.map((a) => (
            <option key={a.name} value={a.name}>{a.name}</option>
          ))}
        </select>
        </div>
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default EditAuthor