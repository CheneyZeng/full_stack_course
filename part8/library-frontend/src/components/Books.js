import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import BookTable from "./BookTable"

const Books = ({show}) => {
  const [filter, setFilter] = useState("all genres")

  const allBooks = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  if (!show) {
    return null
  }

  if (allBooks.loading) return null

  const books = allBooks.data.allBooks
  console.log("BOOKS", books)
  const genreDuplicateArray = books.map(b => b.genres).flat()
  const genres = [...new Set(genreDuplicateArray)]
  console.log("GENRES", genres)
  genres.push("all genres")

  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>{filter}</b></p>
      <BookTable filter={filter} books={books} />
      {genres.map(g => (
        <button key={g} onClick={()=> setFilter(g)}>{g}</button>
      ))}
    </div>
  )
}

export default Books
