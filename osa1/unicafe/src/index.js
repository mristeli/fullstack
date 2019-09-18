import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () => (
  <h1>
    give feedback
  </h1>
)

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const Statistic = ({text, value}) => (
  <tr><td>{text}</td><td>{value}</td></tr>
)

const Statistics = ({good, neutral, bad}) => {
  const countAll = good + neutral + bad
  if(countAll === 0) {
    return <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>  
  }
  return <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={good}/>
          <Statistic text="neutral" value={neutral}/>
          <Statistic text="bad" value={bad}/>
          <Statistic text="all" value={countAll}/>
          <Statistic text="average" value={(good - bad) / countAll}/>
          <Statistic text="positive" value={good / countAll * 100 + ' %'} />
        </tbody>
      </table>
    </div>
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header />
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral"  onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad"  onClick={() => setBad(bad+ 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)