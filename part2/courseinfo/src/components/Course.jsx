const Course = ({course}) => {

    return (
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    ) 
  }
  
  
const Header = ({ course }) => <h1>{course}</h1>
  
const Total = ({ parts }) => { 
  
    let sum = parts.reduce((total, currentPart) => total + currentPart.exercises, 0)
  
    return (
    <strong><p>Total of {sum} exercises</p></strong>
    )
}
  
  
const Part = ({ part }) => 
  
    <p>
      {part.name} {part.exercises}
    </p>
  
  
const Content = ({ parts }) => {
  
      let partsList = parts.map((part) => <Part key={part.id} part={part}/>)
  
      return (
        <>
          {partsList}
        </>
      )
}
  

export default Course