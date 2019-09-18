import React from 'react'

const Course = ({course}) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

const Header = ({course}) => {
  return (
    <h1>
        {course}
    </h1>
  )
}

const Content = ({parts}) => { 
  return <div>
    {parts.map( part => <Part key={part.id} name={part.name} exercises={part.exercises} /> )}
    </div>
}

const Part = ({name, exercises}) => {
  return <p>{name} {exercises}</p>
}

const Total = ({parts}) => {
  const count = parts.reduce( (acc, p) => acc + p.exercises, 0)
  return <p><b>total of {count} exercises</b></p>
}

export default Course