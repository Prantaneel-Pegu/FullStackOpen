/* eslint-disable no-unused-vars */
import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function setValue(value, valueSet) {
    valueSet(value + 1)
  }

  const all = good + neutral + bad
  let average = (good - bad) / all
  const positive = ((good / all) * 100) + '%'

  // Prevents displaying average as NaN on first render
  if (!average) average = 0
  
  const statisticsData = {
    good: good, 
    neutral: neutral, 
    bad: bad, 
    all: all, 
    average: average,
    positive: positive
  }

  return (
    <div>

      <h1>give feedback</h1>
      <Button clickHandler={() => {setValue(good, setGood);}} text="good" />
      <Button clickHandler={() => setValue(neutral, setNeutral)} text="neutral" />
      <Button clickHandler={() => {setValue(bad, setBad);}} text="bad" />
      <Statistics data={statisticsData} />
      
    </div>
  )
}

const Button = ({clickHandler, text}) => {
  return (
    <button onClick={clickHandler}>{text}</button>
  )
}

const Statistics = (props) => {

  let {good, neutral, bad, all, average, positive} = {...props.data}

  if (all===0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </>
  )
}

const StatisticLine = ({text, value}) => {

  return(
      <tr>
        <td>
          <p>{text}</p> 
        </td>
        <td>
          <p>{value}</p> 
        </td>        
      </tr>
  )
}

export default App