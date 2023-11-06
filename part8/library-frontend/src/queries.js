import { gql } from '@apollo/client'

export const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  genres
  published
}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!
  ) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    bookCount
    born
    name
  }
}
`

export const ALL_BOOKS = gql`
query allBooks($genre: String) {
  allBooks(genre: $genre) {
    title
    published
    genres
  }
}
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription bookAdded{
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`