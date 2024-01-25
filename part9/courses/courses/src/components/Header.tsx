interface CourseName {
  name: string;
}

const Header = (props: CourseName): JSX.Element => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  );
};

export default Header;