import { useState } from 'react'

const Header = (props) => {
  return <p><h1>{props.text}</h1></p>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0})
  const [mostVoted, setMostVoted] = useState({mostVotedAnecdote:0, mostVotes:0})

  const handleVote = () => {
    const newVoted = {...voted}
    newVoted[selected] += 1
    setVoted(newVoted)

    console.log("vote", newVoted[selected])
    if (newVoted[selected]>mostVoted["mostVotes"]) {
      console.log("mostVote", mostVoted["mostVotes"])
      setMostVoted({mostVotedAnecdote:selected, mostVotes:newVoted[selected]})
    }
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      {anecdotes[selected]}
      <p>
        <button onClick={handleVote}>vote</button>
        <button onClick={() => setSelected(Math.floor(Math.random() * 8))}>next anecdotes</button>
      </p>
      has {voted[selected]} votes
      <Header text="Anecdote with most votes" />
      <p>{anecdotes[mostVoted["mostVotedAnecdote"]]}</p>
      <p>has {mostVoted["mostVotes"]} votes</p>
    </div>
  )
}

export default App
