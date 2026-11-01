
import "./answeroption.css";

type PropType = {
  answer: string;
  letter: string;
  onClick?: () => void;
  disabled?: boolean;
  isCorrect?: boolean;
  isIncorrect?: boolean;
};

const AnswerOption = ({
  answer,
  letter,
  onClick,
  disabled = false,
  isCorrect = false,
  isIncorrect = false,
}: PropType) => {
  return (
    <button
      type="button"
      className={`answer-option ${
        isCorrect ? "answer-option--correct" : ""
      } ${
        isIncorrect ? "answer-option--incorrect" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="answer-option__letter">
        {letter}
      </span>

      <span className="answer-option__text">
        {answer}
      </span>
    </button>
  );
};

export default AnswerOption;
