import { useCallback, useState, useRef } from "react";
import QUESTIONS from "../questions";
import Timer from "./quizTimer";
import image from "../assets/quiz-complete.png";
import classes from "./quiz.module.css";

function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const shuffledAnswers = useRef();
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
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <div className={classes.questionBox}>
      <Timer
        key={activeQuestionIndex}
        timeout={10000}
        onTimeout={skipAnswerHandler}
      />
      <p className={classes.question}>{QUESTIONS[activeQuestionIndex].text}</p>

      <ul className={classes.optionUl}>
        {shuffledAnswers.current.map((answer) => {
          const isSelected = userAnswers[userAnswers.length - 1] === answer;
          let cssClass = "";
          if (answerState === "answered" && isSelected) {
            cssClass = classes.selected;
          }

          if (answerState === "correct" && isSelected) {
            cssClass = classes.correct;
          }
          if (answerState === "wrong" && isSelected) {
            cssClass = classes.wrong;
          }

          return (
            <li className={classes.option} key={answer}>
              <button
                onClick={() => nextQuestionHandler(answer)}
                className={cssClass}
              >
                {answer}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Quiz;
