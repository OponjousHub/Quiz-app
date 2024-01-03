import { useRef } from "react";
import classes from "./quiz.module.css";

function Answers({ answers, selectedAnswer, answerState, onSelect }) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul className={classes.optionUl}>
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
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
            <button onClick={() => onSelect(answer)} className={cssClass}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default Answers;
