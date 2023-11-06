import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const BookTable = ({filter, books}) => {
  let filterBooks = books
  const {data, loading} = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
    variables: {
      genre: filter
    },
    skip: filter === "all genres",
  },
  )
  if (loading) return null
  if (filter !== "all genres") {
    filterBooks = data.allBooks
  }
  return (
    <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filterBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
  )}

export default BookTable