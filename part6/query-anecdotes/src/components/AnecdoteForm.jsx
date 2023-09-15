import { createAnecdote } from '../requests'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotificationDispatch } from './NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote,{
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })
  const dispatch = useNotificationDispatch()
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, vote: 0 },{
      onSuccess: () => {
        dispatch({ type: 'SET_NOTIFICATION', data: `you created '${content}'` })
        setTimeout(() => {
          dispatch({ type: 'SET_NOTIFICATION', data: '' })
        }, 5000)
      },
      onError: () => {
        dispatch({ type: 'SET_NOTIFICATION', data: `error creating '${content}', need at least 5 characters` })
        setTimeout(() => {
          dispatch({ type: 'SET_NOTIFICATION', data: '' })
        } , 5000)
    }
  })
    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
