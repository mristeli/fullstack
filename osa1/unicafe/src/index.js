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

const Statistics = ({good, neutral, bad}) => (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
) 

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