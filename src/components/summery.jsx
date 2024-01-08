import QUESTIONS from "../questions";
import classes from "./quizComplete.module.css";
import image from "../assets/quiz-complete.png";

function Summery({ userAnswers }) {
  console.log(userAnswers);
  const skipped = userAnswers.filter((ans) => ans === null);
  const correct = userAnswers.filter((ans, index) => {
    ans === QUESTIONS[index].answers[0];
  });

  const skippedAnswers = (skipped.length / userAnswers.length) * 100;
  const correctAnswers = (correct.length / userAnswers.length) * 100;
  const wrongAnswers = 100 - skippedAnswers - correctAnswers;

  return (
    <div>
      <div className={classes.imgBox}>
        <img src={image} alt="Quiz over logo" width="50px" height="65px" />
      </div>
      <h2 className={classes.quizOverText}>Quiz Complete</h2>

      <div className={classes.summery_statistics}>
        <p>
          <span className={classes.number}>{Math.round(skippedAnswers)}%</span>
          <span className={classes.text}>skipped</span>
        </p>
        <p>
          <span className={classes.number}>{Math.round(correctAnswers)}%</span>
          <span className={classes.text}>Answered Correctly</span>
        </p>
        <p>
          <span className={classes.number}>{Math.round(wrongAnswers)}%</span>
          <span className={classes.text}>Answered wrongly</span>
        </p>
      </div>
      <hr />
      <ul>
        {userAnswers.map((answer, index) => {
          let cssClass = "";
          if (answer === QUESTIONS[index].answers[0]) {
            cssClass = classes.green;
          } else if (answer !== QUESTIONS[index].answers[0]) {
            cssClass = classes.red;
          } else {
            cssClass = classes.gray;
          }
          return (
            <li key={index} className={classes.question_list}>
              <h2>{index + 1}</h2>
              <p className={classes.question_text}>{QUESTIONS[index].text}</p>
              <p className={`${classes.users_anwer} ${cssClass}`}>
                {answer ? answer : "Skipped"}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Summery;
