import image from "../assets/quiz-logo.png";

function Header() {
  return (
    <header>
      <img src={image} alt="quiz logo" />
      <h1>REACTQUIZ</h1>
    </header>
  );
}

export default Header;
