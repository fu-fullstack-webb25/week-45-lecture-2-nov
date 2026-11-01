
import type { DifficultyType, QuestionType } from "../types/quiz.types";

type QuizResponse = {
  response_code: number;
  results: QuestionType[];
};

export const getQuiz = async (
  amount : number,
  category : number,
  difficulty : DifficultyType["value"]
): Promise<QuestionType[]> => {
  const url = new URL("https://opentdb.com/api.php");

  url.searchParams.set("amount", String(amount));
  url.searchParams.set("category", String(category));
  url.searchParams.set("difficulty", difficulty);
  url.searchParams.set("type", "multiple");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Kunde inte hämta quizfrågorna");
  }

  const data: QuizResponse = await response.json();

  if (data.response_code !== 0) {
    throw new Error("Inga frågor hittades för dina val");
  }

  return data.results;
};


const logger = <T>(log : T) => {
  console.log(log);
}

logger<string>('hello');
logger<number>(12);
logger<boolean>(true);