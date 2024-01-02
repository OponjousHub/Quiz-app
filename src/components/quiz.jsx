import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import Timer from "./quizTimer";
import image from "../assets/quiz-complete.png";
import classes from "./quiz.module.css";

function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  const nextQuestionHandler = useCallback((answer) => {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, answer];
    });
  }, []);

  const skipAnswerHandler = useCallback(
    () => nextQuestionHandler(null),
    [nextQuestionHandler]
  );

  const quizIsOver = activeQuestionIndex === QUESTIONS.length;

  if (quizIsOver) {
    return (
      <div className={classes.quizOver}>
        <img src={image} alt="Quiz over logo" width="60px" height="80px" />
        <h2 className={classes.quizOverText}>Quiz Complete</h2>
      </div>
    );
  }
  const sortedAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  const shuffledAnswers = sortedAnswers.sort(() => Math.random() - 0.5);

  return (
    <div className={classes.questionBox}>
      <Timer
        key={activeQuestionIndex}
        timeout={10000}
        onTimeout={skipAnswerHandler}
      />
      <p className={classes.question}>{QUESTIONS[activeQuestionIndex].text}</p>
      <ul className={classes.optionUl}>
        {shuffledAnswers.map((answer) => (
          <li className={classes.option} key={answer}>
            <button
              onClick={() => nextQuestionHandler(answer)}
              className={classes.optionBtn}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Quiz;
