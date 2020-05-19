import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
      <div>
        <h1>
          {props.title}
        </h1>
      </div>
  )
};
const Part = (props) => {
  return(
    <div>
      <p>{props.title}: {props.exercises}</p>
    </div>
  )
};
const Content = (props) => {
  return(
    <div>
      <Part title={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part title={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part title={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </div>
  )
};
const Total = (props) => {
  return(
    <div>
      <p>Number of exercises: {props.exercises[0].exercises + props.exercises[1].exercises + props.exercises[2].exercises}</p>
    </div>
  )
};


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header title={course.name}/>
      <Content parts={course.parts}/>
      <Total exercises={course.parts}/>
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));