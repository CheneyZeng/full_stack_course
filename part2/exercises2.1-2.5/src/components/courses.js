const Header = (props) => {
    console.log(props)
    return <h2>{props.course}</h2>
  }
  
  const Content = (props) => {
    console.log(props)
    return props.parts.map(value => <p>{value.name} {value.exercises}</p>)
  }
  
  const Total = (props) => {
    console.log("parts", props)
    const sumExercises = props.parts.reduce((previousValue, currentValue) => previousValue + currentValue.exercises, 0)
    console.log("total", sumExercises)
    return <p><strong>total of {sumExercises} exercises</strong></p>
  }
  
  const Course = (props) => {
    console.log("props", props)
    const course = props.course
    console.log("course", course)
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course