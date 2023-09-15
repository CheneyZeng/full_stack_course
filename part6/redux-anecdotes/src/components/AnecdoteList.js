import { useSelector, useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { updateVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({filter, anecdotes}) => {
      if ( filter ) {
        return [...anecdotes.filter(anecdote =>
          anecdote.content.includes(filter))]
      }
      return [...anecdotes]
    })
      console.log('anecdotes', anecdotes)
    return (<ul>{anecdotes.sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => {
                  dispatch(updateVote(anecdote))
                  dispatch(createNotification(`You voted '${anecdote.content}'`, 5));
                  }}>vote</button>
              </div>
            </div>
          )}</ul>)
}

export default AnecdoteList