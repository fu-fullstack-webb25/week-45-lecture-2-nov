import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
    CategoryType,
    DifficultyType,
    QuestionType,
    HighScoreType,
} from "../types/quiz.types";

interface QuizStore {
    // Användare och inställningar
    username: string;
    category: CategoryType | null;
    difficulty: DifficultyType["value"] | null;
    amount: number;

    // Quiz
    questions: QuestionType[];
    currentQuestion: number;
    selectedAnswer: string | null;
    score: number;
    isFinished: boolean;

    // Highscore
    highScores: HighScoreType[];

    // Actions
    setUsername: (username: string) => void;
    setCategory: (category: CategoryType) => void;
    setDifficulty: (difficulty: DifficultyType["value"]) => void;
    setAmount: (amount: number) => void;

    startQuiz: (questions: QuestionType[]) => void;
    answerQuestion: (answer: string) => void;
    nextQuestion: () => void;
    resetQuiz: () => void;
    saveHighScore: () => void;
}

const useQuizStore = create<QuizStore>()(
    persist(
        (set, get) => ({
            username: "",
            category: null,
            difficulty: null,
            amount: 10,

            questions: [],
            currentQuestion: 0,
            selectedAnswer: null,
            score: 0,
            isFinished: false,

            highScores: [],

            setUsername: (username) => set({ username }),
            setCategory: (category) => set({ category }),
            setDifficulty: (difficulty) => set({ difficulty }),
            setAmount: (amount) => set({ amount }),

            startQuiz: (questions) =>
                set({
                questions,
                currentQuestion: 0,
                selectedAnswer: null,
                score: 0,
                isFinished: false,
                }),

            answerQuestion: (answer) => {
                const {
                    questions,
                    currentQuestion,
                    selectedAnswer,
                    isFinished,
                } = get();

                if (selectedAnswer !== null || isFinished) return;

                const question = questions[currentQuestion];
                if (!question) return;

                set((state) => ({
                    selectedAnswer: answer,
                    score:
                        answer === question.correct_answer
                        ? state.score + 1
                        : state.score,
                    })
                );
            },

            nextQuestion: () => {
                const {
                    questions,
                    currentQuestion,
                    selectedAnswer,
                    isFinished,
                } = get();

                if (selectedAnswer === null || isFinished) return;

                const isLastQuestion = currentQuestion === questions.length - 1;

                if (isLastQuestion) {
                    set({ isFinished: true });
                    get().saveHighScore();
                } else {
                    set({
                        currentQuestion: currentQuestion + 1,
                        selectedAnswer: null,
                    });
                }
            },

            resetQuiz: () =>
                set({
                    questions: [],
                    currentQuestion: 0,
                    selectedAnswer: null,
                    score: 0,
                    isFinished: false,
                }),

            saveHighScore: () => {
                const { username, score, questions, highScores } = get();

                if (questions.length === 0) return;

                const newHighScore: HighScoreType = {
                    username,
                    score,
                    totalQuestions: questions.length,
                    date: new Date().toISOString(),
                };

                set({
                    highScores: [...highScores, newHighScore].sort(
                        (a, b) =>
                        b.score / b.totalQuestions -
                        a.score / a.totalQuestions
                    ),
                });
            },
        }),
        {
            name: "quiz-storage",
            partialize: (state) => ({
                highScores: state.highScores,
            }),
        }
    )
);

export default useQuizStore;
