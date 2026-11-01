import useQuizStore from "../../stores/useQuizStore";
import "./progressbar.css";

const ProgressBar = () => {
    const { currentQuestion, questions, selectedAnswer } = useQuizStore();

    const answeredQuestions = currentQuestion + (selectedAnswer !== null ? 1 : 0);

    const progress = questions.length > 0
    ? (answeredQuestions / questions.length) * 100
    : 0;

  return (
        <div className="quiz-progress">
            <div className="quiz-progress__info">
                <span>
                Fråga {currentQuestion + 1} av {questions.length}
                </span>
                <span>{Math.round(progress)}%</span>
            </div>

            <div className="quiz-progress__track">
                <div
                className="quiz-progress__fill"
                style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
