export interface CategoryType {
  id : number;
  name : string;
};

export interface DifficultyType {
  value : 'easy' | 'medium' | 'hard';
  label : 'Lätt' | 'Medel' | 'Svår';
};

export interface QuestionType {
  type : "multiple" | "boolean";
  difficulty : DifficultyType["value"];
  category : string;
  question : string;
  correct_answer : string;
  incorrect_answers : string[];
}

export interface HighScoreType {
  username : string;
  score : number;
  totalQuestions : number;
  date : string;
}