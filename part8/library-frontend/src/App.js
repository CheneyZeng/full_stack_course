import { useEffect, useState } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/Login'
import Recommend from './components/Recommend'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
		const tkn = localStorage.getItem("library-user-token")
		setToken(tkn)
	}, [page])

  const authors = useQuery(ALL_AUTHORS)

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log("DATA", data)
      const addedBook = data.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  if (authors.loading) {
    return <div>loading...</div>
  }

  const logoutUser = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("authors")
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && (
          <div>
            <button onClick={() => setPage('login')}>login</button>
          </div>
        )}
        {token && (
          <div>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={ logoutUser }>logout</button>
          </div>
        )}
      </div>

      <Authors show={page === 'authors'} authors={authors.data.allAuthors}/>
      <Books show={page === 'books'}/>
      <Recommend show={page === 'recommend'} />
      <NewBook show={page === 'add'} />
      <LoginForm show={page === "login"}
				setPage={setPage} />
    </div>
  )
}

export default App
