/* eslint-disable no-unused-vars */
import Course from "./components/Course"

const App = () => {

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  function createKeys(id) {
    if (id === 0) return (id + Math.random() * 999).toFixed(8)
    return (id * Math.random() * Math.random() * Math.random() * 999).toFixed(8)
  }

  let coursesList = courses.map((courseItem, id) => <Course key={createKeys(id)} course={courseItem} />)
  return <>{coursesList}</>
}

export default App;

