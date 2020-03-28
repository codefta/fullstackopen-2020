import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
)

const Content = (props) => {
  const parts = props.parts

  return (
    <div>
      {
        parts.map(part =>
          <Part part={part.name} exercises={part.exercises} />
        )
      }
    </div>
  )
}

const Total = (props) => {
  const { parts }  = props
  const total = parts
                    .map(part => part.exercises)
                    .reduce((acc, cur) => acc + cur)

  return (
    <p>Number of exercises {total} </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
