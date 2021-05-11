import React, { useState } from 'react'

const Statistics = (props) => {
  if (props.good || props.neutral || props.bad) {
    return (
      <>
        <h1>statistics</h1>
        <p>good {props.good}</p>
        <p>neutral {props.neutral}</p>
        <p>bad {props.bad}</p>
        <p>all {props.good + props.neutral + props.bad}</p>
        <p>average {props.good > 0 || props.neutral > 0 || props.bad > 0 ? Math.abs((props.good + (props.bad * -1)) / (props.good + props.neutral + props.bad)) : 0}</p>
        <p>positive {props.good > 0 || props.neutral > 0 || props.bad > 0 ? (props.good / (props.good + props.neutral + props.bad)) * 100 : 0} %</p>
      </>
    )
  } else {
    return (
      <>
        <h1>statistics</h1>
        <p>no feedback given</p>
      </>
    )
  }

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App