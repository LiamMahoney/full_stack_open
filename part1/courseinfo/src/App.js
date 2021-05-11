import React, { useState } from 'react'

const Statistics = (props) => {
  if (props.good || props.neutral || props.bad) {
    return (
      <>
        <h1>statistics</h1>
        <Statistic title="good" data={props.good}/>
        <Statistic title="neutral" data={props.neutral}/>
        <Statistic title="bad" data={props.bad}/>
        <Statistic title="all" data={props.good + props.neutral + props.bad}/>
        <Statistic title="average" data={Math.abs((props.good + (props.bad * -1)) / (props.good + props.neutral + props.bad))}/>
        <Statistic title="positive" data={`${(props.good / (props.good + props.neutral + props.bad)) * 100} %`}/>
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

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statistic = (props) => {
  return (
    <p>{props.title} {props.data}</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App