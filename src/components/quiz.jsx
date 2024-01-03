import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import Question from "./question";

import image from "../assets/quiz-complete.png";
import classes from "./quiz.module.css";

function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsOver = activeQuestionIndex === QUESTIONS.length;

  const nextQuestionHandler = useCallback(
    (answer) => {
      setAnswerState("answered");

      setUserAnswers((prevAnswers) => {
        return [...prevAnswers, answer];
      });

      setTimeout(() => {
        if (answer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const skipAnswerHandler = useCallback(
    () => nextQuestionHandler(null),
    [nextQuestionHandler]
  );

  if (quizIsOver) {
    return (
      <div className={classes.quizOver}>
        <img src={image} alt="Quiz over logo" width="60px" height="80px" />
        <h2 className={classes.quizOverText}>Quiz Complete</h2>
      </div>
    );
  }

  return (
    <div className={classes.questionBox}>
      <Question
        key={activeQuestionIndex}
        onSkip={skipAnswerHandler}
        questionText={QUESTIONS[activeQuestionIndex].text}
        questionAnswers={QUESTIONS[activeQuestionIndex].answers}
        onSelectAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onPicked={nextQuestionHandler}
      />
    </div>
  );
}

export default Quiz;
