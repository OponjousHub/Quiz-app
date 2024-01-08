import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import Question from "./question";
import Summery from "./summery";
import classes from "./quiz.module.css";

function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  const quizIsOver = activeQuestionIndex === QUESTIONS.length;

  const nextQuestionHandler = useCallback((answer) => {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, answer];
    });
  }, []);

  const skipAnswerHandler = useCallback(
    () => nextQuestionHandler(null),
    [nextQuestionHandler]
  );

  if (quizIsOver) {
    return (
      <div className={classes.quizOver}>
        <Summery userAnswers={userAnswers} />
      </div>
    );
  }

  return (
    <div className={classes.questionBox}>
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSkip={skipAnswerHandler}
        onSelectAnswer={nextQuestionHandler}
      />
    </div>
  );
}

export default Quiz;
