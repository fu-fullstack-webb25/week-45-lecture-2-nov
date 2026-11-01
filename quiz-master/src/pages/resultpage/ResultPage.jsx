
import { Link, Navigate } from "react-router-dom";
import useQuizStore from "../../stores/useQuizStore";
import "./resultpage.css";

const ResultPage = () => {
  const {
    username,
    score,
    questions,
    category,
    difficulty,
    isFinished,
    resetQuiz,
  } = useQuizStore();

  if (!isFinished) {
    return <Navigate to="/" replace />;
  }

  const totalQuestions = questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  const getMessage = () => {
    if (percentage === 100) return "Perfekt resultat!";
    if (percentage >= 80) return "Riktigt bra jobbat!";
    if (percentage >= 50) return "Bra kämpat!";
    return "Bättre lycka nästa gång!";
  };

  return (
    <main className="result-page">
      <div className="result-card">
        <div className="result-card__header">
          <span className="result-card__label">
            QUIZ AVSLUTAT
          </span>

          <h1>Bra jobbat, {username}!</h1>

          <p>{getMessage()}</p>
        </div>

        <div className="result-card__score">
          <span className="result-card__score-number">
            {score}
            <span>/{totalQuestions}</span>
          </span>

          <p>Rätta svar</p>
        </div>

        <div className="result-card__progress">
          <div
            className="result-card__progress-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="result-card__percentage">
          Du svarade rätt på {percentage}% av frågorna.
        </p>

        <div className="result-card__details">
          <div>
            <span>Kategori</span>
            <strong>{category?.name ?? "Okänd"}</strong>
          </div>

          <div>
            <span>Svårighetsgrad</span>
            <strong>
              {difficulty === "easy"
                ? "Lätt"
                : difficulty === "medium"
                  ? "Medium"
                  : "Svår"}
            </strong>
          </div>

          <div>
            <span>Antal frågor</span>
            <strong>{totalQuestions}</strong>
          </div>
        </div>

        <div className="result-card__actions">
          <Link
            to="/highscore"
            className="result-card__button result-card__button--primary"
        >
            Visa highscore
        </Link>

          <Link
            to="/"
            className="result-card__button result-card__button--secondary"
            onClick={resetQuiz}
          >
            Till startsidan
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ResultPage;
