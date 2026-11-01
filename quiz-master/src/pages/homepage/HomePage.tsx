import QuizForm from "../../components/quizform/QuizForm";
import type { CategoryType, DifficultyType } from "../../types/quiz.types";
import './homepage.css';

const HomePage = () => {

    const categories : CategoryType[] = [
        {
            id : 21,
            name : 'Sport'
        },
        {
            id : 23,
            name : 'Historia'
        },
    ];

    const difficulties : DifficultyType[] = [
        { 
            value: "easy", 
            label: "Lätt" 
        },
        { 
            value: "medium", 
            label: "Medel" 
        },
        { 
            value: "hard", 
            label: "Svår" 
        },
    ];

    return (
        <section className="page wrapper">
            <h2 className="page__title">
                Dags för quiz!
            </h2>

            <h3 className="page__subtitle">
                Välj kategori, svårighetsgrad, antal frågor och utmana dig själv!
            </h3>

            <QuizForm 
                categories={ categories }
                difficulties={ difficulties }
            />
        </section>
    )
}

export default HomePage;