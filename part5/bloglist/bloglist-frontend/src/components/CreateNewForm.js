const createNewForm = ({ handleCreate, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange }) => (
  <div>
    <form onSubmit={handleCreate}>
      <div>
          title
        <input
          type="text"
          id="title"
          value={title}
          name="Title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
          author
        <input
          type="text"
          value={author}
          id="author"
          name="Author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
          url
        <input
          type="text"
          value={url}
          id="url"
          name="Url"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit" id="create">create</button>
    </form>
  </div>
)

export default createNewForm