
import { useState } from "react";
import type { QuestionType } from "../../types/quiz.types";
import useQuizStore from "../../stores/useQuizStore";
import AnswerOption from "../answeroption/AnswerOption";
import { useNavigate } from "react-router-dom";
import "./questioncard.css";

type PropType = {
  question: QuestionType;
};

const QuestionCard = ({ question }: PropType) => {
  const {
    selectedAnswer,
    answerQuestion,
    nextQuestion,
    currentQuestion,
    questions,
  } = useQuizStore();

  const [answers] = useState<string[]>(() =>
    [...question.incorrect_answers, question.correct_answer]
      .sort(() => Math.random() - 0.5)
  );

  const isLastQuestion = currentQuestion === questions.length - 1;

  const navigate = useNavigate();

  const handleNextQuestion = () => {
    nextQuestion();

    if (isLastQuestion) {
      navigate("/result");
    }
  };

  return (
    <article className="question-card">
      <h2 className="question-card__title">
        {question.question}
      </h2>

      <div className="question-card__answers">
        {answers.map((answer, index) => (
          <AnswerOption
            key={answer}
            answer={answer}
            letter={String.fromCharCode(65 + index)}
            onClick={() => answerQuestion(answer)}
            disabled={selectedAnswer !== null}
            isCorrect={
              selectedAnswer !== null &&
              answer === question.correct_answer
            }
            isIncorrect={
              selectedAnswer === answer &&
              answer !== question.correct_answer
            }
          />
        ))}
      </div>

      {selectedAnswer !== null && (
        <>
          <p className="question-card__feedback">
            {selectedAnswer === question.correct_answer
              ? "Rätt svar!"
              : "Fel svar!"}
          </p>

          <button
            type="button"
            className="question-card__next"
            onClick={handleNextQuestion}
          > 
            {isLastQuestion ? "Se resultat" : "Nästa fråga"}
          </button>
        </>
      )}
    </article>
  );
};

export default QuestionCard;
