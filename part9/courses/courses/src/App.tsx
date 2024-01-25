import Header  from './components/Header';
import Content from './components/Content';
import Total   from './components/Total';
import CoursePart from './data/CoursePart';

const App = () => {
  const courseName = "Half Stack application development";
  const totalExercises = CoursePart.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={CoursePart} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;