import { useState } from 'react'
import './App.css';

const Header = (props) => {
  return <p><h1>{props.text}</h1></p>
}

const Button = (props) => {
  return <p><button onClick={props.handleClick}>{props.text}</button></p>
}

const SingleStat = (props) => {
  return <tr><td>{props.text}</td><td>{props.data}</td></tr>
}

const AllStat = ({good, neutral, bad}) => {
  const all = good+neutral+bad
  return <tr><td>all</td><td>{all}</td></tr>
}

const AverageStat = ({good, neutral, bad}) => {
  const all = good+neutral+bad
  const average = (good*2+bad*(-1))/all
  return <tr><td>average</td><td>{average}</td></tr>
}

const PositiveStat = ({good, neutral, bad}) => {
  const all = good+neutral+bad
  const positive = good/all
  return <tr><td>positive</td><td>{positive}</td></tr>
}

const Statistics = (props) => {
  if (props.good === 0 && props.bad === 0 && props.neutral === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <table>
        <SingleStat text="good" data={props.good} />
        <SingleStat text="neutral" data={props.neutral} />
        <SingleStat text="bad" data={props.bad} />
        <AllStat good={props.good} neutral={props.neutral} bad={props.bad} />
        <AverageStat good={props.good} neutral={props.neutral} bad={props.bad} />
        <PositiveStat good={props.good} neutral={props.neutral} bad={props.bad} />
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div className="App">
      <p><Header text="give feedback" /></p>
      <p><Button handleClick={() => setGood((good+1))} text="good" /></p>
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
