import { CoursePart } from "../data/CoursePart";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Content = (props: CoursePart[]): JSX.Element => {
  return (
    <div>
      {props.courseParts.map((courseContent: CoursePart) => {
        switch (courseContent.kind) {
          case "basic":
            return (
              <div>
              <p>
                <b> {courseContent.name} {courseContent.exerciseCount}</b><br />
                <i> {courseContent.description} </i>
                </p>
              </div>
            )
          case "group":
            return (
              <div>
              <p>
                <b> {courseContent.name} {courseContent.exerciseCount}</b><br />
                project exercises {courseContent.groupProjectCount}
              </p>
              </div>
            )
          case "background":
            return (
              <div>
              <p>
                <b> {courseContent.name} {courseContent.exerciseCount}</b><br />
                <i> {courseContent.description} </i> <br />
              submit to {courseContent.backgroundMaterial}
              </p>
              </div>
            )
          default:
            return assertNever(courseContent);
        }
      })}
    </div>
  );
};

export default Content;