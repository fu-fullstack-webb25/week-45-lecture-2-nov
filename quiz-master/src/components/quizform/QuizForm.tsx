import useQuizStore from "../../stores/useQuizStore";
import type { CategoryType, DifficultyType } from "../../types/quiz.types";
import type { FormEvent } from 'react';
import './quizform.css';
import { useNavigate } from "react-router-dom";

type PropType = {
    categories : CategoryType[];
    difficulties : DifficultyType[];
}

const QuizForm = ({ categories, difficulties } : PropType) => {
    const {
        setUsername,
        setCategory,
        setDifficulty,
        setAmount
    } = useQuizStore();

    const navigate = useNavigate();

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const username = String(formData.get("username")).trim();
        const categoryId = Number(formData.get("category"));
        const difficulty = formData.get("difficulty");
        const amount = Number(formData.get("amount"));

        const selectedCategory = categories.find(
            (category) => category.id === categoryId
        );

        const selectedDifficulty = difficulties.find(
            (item) => item.value === difficulty
        );

        if (!username || !selectedCategory || !selectedDifficulty) {
            return;
        }

        setUsername(username);
        setCategory(selectedCategory);
        setDifficulty(selectedDifficulty.value);
        setAmount(amount);

        console.log("Quizinställningar sparade!");
        navigate('/quiz');
    }

    return (
        <form className="quiz-form" onSubmit={ handleSubmit }>
            <label className="quiz-form__label">
                Ditt namn
                <input name="username" type="text" className="quiz-form__input" />
            </label>
            <label className="quiz-form__label">
                Kategori
                <select name="category" id="" className="quiz-form__input quiz-form__input--select">
                    <option value="">Välj kategori</option>
                    {
                        categories.map((category) => (
                            <option key={ category.id } value={ category.id }>
                                { category.name }
                            </option>
                        ))
                    }
                </select>
            </label>

            <label className="quiz-form__label">
                Svårighetsgrad
                <select name="difficulty" className="quiz-form__input quiz-form__input--select">
                    <option value="">Välj svårighetsgrad</option>
                    {
                        difficulties.map((difficulty) => (
                            <option key={ difficulty.value } value={ difficulty.value }>
                                { difficulty.label }
                            </option>
                        ))
                    }
                </select>
            </label>

            <label className="quiz-form__label">
                Antal frågor
                <select name="amount" className="quiz-form__input quiz-form__input--select">
                    {
                        [5, 6, 7, 8, 9, 10].map((amount) => (
                            <option key={ amount } value={ amount }>
                                { amount } frågor
                            </option>
                        ))
                    }
                </select>
            </label>
            <button className="quiz-form__button">Starta quiz</button>
        </form>
    )
}

export default QuizForm;