import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    console.log(props)
    return (
      <h1>
          {props.course}
      </h1>
    )
  }

const Content = (props) => { 
  const parts = props.parts
  return <div>
    {parts.map( part => <Part name={part.name} exercises={part.exercises} /> )}
    </div>
}

const Part = (props) => {
  console.log(props)
  return <p>{props.name} {props.exercises}</p>
}

const Total = (props) => {
  console.log(props)
  const count = props.parts.reduce( (acc, p) => acc + p.exercises, 0)
  return <p>Number of exercises {count}</p>
}

const App = () => {
  const course = {
    name:  'Half Stack application development',
    parts: [{
      name: 'Fundamentals of React',
      exercises: 10
    }, {
      name: 'Using props to pass data',
      exercises: 7
    }, {
      name: 'State of a component',
      exercises: 14
    }]
  }
 
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))