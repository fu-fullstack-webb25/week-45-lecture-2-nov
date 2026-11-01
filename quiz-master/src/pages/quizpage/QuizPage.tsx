import { useQuery } from "@tanstack/react-query";
import { getQuiz } from "../../services/quiz.api";
import useQuizStore from "../../stores/useQuizStore";
import QuestionCard from "../../components/questioncard/QuestionCard";
import ProgressBar from "../../components/progressbar/ProgressBar";
import { useEffect } from "react";

const QuizPage = () => {
  const {
    amount,
    category,
    difficulty,
    questions,
    currentQuestion,
    startQuiz,
  } = useQuizStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["quiz", amount, category?.id, difficulty],
    queryFn: () => getQuiz(amount, category!.id, difficulty!),
    enabled: category !== null && difficulty !== null,
    retry: false,
  });

  useEffect(() => {
    if (data && questions.length === 0) {
      startQuiz(data);
    }
  }, [data, questions.length, startQuiz]);

  console.log("Quizdata:", data);

  if (isLoading) return <p>Hämtar frågor...</p>;
  if (isError) return <p>Fel: {error.message}</p>;

  return (
    <section className="page wrapper">
      {
        questions.length > 0 && (
          <>
            <ProgressBar />
            <QuestionCard
              key={currentQuestion}
              question={questions[currentQuestion]}
              />
          </>
        )
      }
    </section>
  );
};

export default QuizPage;