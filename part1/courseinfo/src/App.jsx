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
      <Header course={course.name} />
      <Content parts={course.parts}  />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  const part1 = props.parts[0].name;
  const part2 = props.parts[1].name;
  const part3 = props.parts[2].name;
  const exercises1 = props.parts[0].exercises;
  const exercises2 = props.parts[1].exercises;
  const exercises3 = props.parts[2].exercises;

  return (
    <div>
      <Part part={part1} exercise={exercises1} />
      <Part part={part2} exercise={exercises2} />
      <Part part={part3} exercise={exercises3} />
    </div>
  )
}

const Part = (props) => {
  const part = props.part;
  const exercise = props.exercise;

  return (
    <p>
      {part} {exercise}
    </p>
  )
}


const Total = (props) => {
  const exercises1 = props.parts[0].exercises;
  const exercises2 = props.parts[1].exercises;
  const exercises3 = props.parts[2].exercises;

  return (
    <>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </>
  )
}

export default App;


