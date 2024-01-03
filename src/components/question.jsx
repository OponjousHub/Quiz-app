import Timer from "./quizTimer";
import Answers from "./answers";
import classes from "./quiz.module.css";

function Question({
  onSkip,
  questionText,
  questionAnswers,
  onSelectAnswer,
  answerState,
  onPicked,
}) {
  return (
    <div>
      <Timer timeout={10000} onTimeout={onSkip} />
      <p className={classes.question}>{questionText}</p>
      <Answers
        answers={questionAnswers}
        selectedAnswer={onSelectAnswer}
        answerState={answerState}
        onSelect={onPicked}
      />
    </div>
  );
}

export default Question;
