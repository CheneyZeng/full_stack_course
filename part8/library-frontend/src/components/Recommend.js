import BookTable from "./BookTable"

const Recommend = ({show}) => {
  if (!show) {
    return null
  }
  const favoriteGenre = localStorage.getItem("favorite-genre")
  console.log(favoriteGenre)
  return (
    <div>
      <h2>recommendations</h2>
      <p>in genre <b>{favoriteGenre}</b></p>
      <BookTable filter={favoriteGenre} />
    </div>
  )
}

export default Recommend
