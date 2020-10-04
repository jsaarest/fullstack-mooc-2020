import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const StatisticsLine = ({text, value}) => {
  return(
    <div>
      <p>{text} : {value}</p>
    </div>
  )
}
const Statistics = ({data}) => {

  return(
    <>
    <StatisticsLine text="Good" value={data.good}/>
    <StatisticsLine text="Neutral" value={data.neutral}/>
    <StatisticsLine text="Bad" value={data.bad}/>
    <StatisticsLine text="All" value={data.bad + data.good + data.neutral}/>
    <StatisticsLine text="Average" value={(data.bad + data.good + data.neutral / 3).toFixed(2)}/>
    <StatisticsLine text="Positive" value={(data.good / (data.good + data.bad + data.neutral) * 100).toFixed(2) + "%" }/>
    </>
  )
}



const defaultData = {
  good: 0,
  neutral: 0,
  bad: 0
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [data, setData] = useState(defaultData)
  console.log(data)

  const Increase = (e) => {

    const {name, value} = e.target
  
    setData({...data, [name]: parseInt(value)  + 1})
  }

  return (
    <div>

      <h1>Give feedback</h1>

      <div>
        <button name="good" value={data.good} onClick={Increase}>Good</button>
        <button name="neutral" value={data.neutral} onClick={Increase}>Neutral</button>
        <button name="bad" value={data.bad} onClick={Increase}>Bad</button>
      </div>

      <h2>Statistics</h2>

      <Statistics data={data}/>

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
