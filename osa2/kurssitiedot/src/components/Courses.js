const Header = ({title}) => {
  return(
    <div>
      <h1>
        {title}
      </h1>
    </div>
  )
};
const Part = ({title, exercises}) => {
  return(
    <div>
      <p>{title}: {exercises}</p>
    </div>
  )
};
const Content = ({parts}) => {
  return(
    parts.map(({name, exercises, id}) => (
      <Part title={name} exercises={exercises} key={id}/>
    ))
  )
};

const Total = ({parts}) => {
  const exercises = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
  return(
    <div>
      <p>Total of exercises: {exercises}</p>
    </div>
  )
};

const Courses = (props) => {
  const { course } = props;
  return(
    <>
      <Header title={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
};

export default Courses