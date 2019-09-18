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

const Course = ({course}) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

const Content = (props) => { 
  const parts = props.parts
  
  return <div>
    {parts.map( part => <Part key={part.id} name={part.name} exercises={part.exercises} /> )}
    </div>
}

const Part = (props) => {
  console.log(props)
  return <p>{props.name} {props.exercises}</p>
}

const Total = (props) => {
  console.log(props)
  const count = props.parts.reduce( (acc, p) => acc + p.exercises, 0)
  return <p><b>Number of exercises {count}</b></p>
}

const App = () => {
  const course = {
    name:  'Half Stack application development',
    parts: [{
      id: 1,
      name: 'Fundamentals of React',
      exercises: 10
    }, {
      id: 2,
      name: 'Using props to pass data',
      exercises: 7
    }, {
      id: 3,
      name: 'State of a component',
      exercises: 14
    }, {
      id: 4,
      name: 'New part',
      exercises: 100
    }]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))