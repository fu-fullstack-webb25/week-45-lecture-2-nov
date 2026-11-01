
import { Link } from "react-router-dom";
import useQuizStore from "../../stores/useQuizStore";
import "./highscorepage.css";

const HighScorePage = () => {
    const { highScores } = useQuizStore();

    const sortedScores = [...highScores].sort((a, b) => {
        const percentageA = a.score / a.totalQuestions;
        const percentageB = b.score / b.totalQuestions;

        if (percentageA !== percentageB) {
            return percentageB - percentageA;
        }

        return b.score - a.score;
    });

  return (
    <main className="highscore-page">
      <div className="highscore-card">
        <header className="highscore-card__header">
          <span className="highscore-card__label">
            QUIZMASTER
          </span>

          <h1>Highscore</h1>
          <p>Här är de bästa resultaten hittills.</p>
        </header>

        {sortedScores.length === 0 ? (
          <div className="highscore-empty">
            <h2>Inga resultat ännu</h2>
            <p>
              Spela ditt första quiz för att hamna
              på topplistan!
            </p>
          </div>
        ) : (
          <div className="highscore-table-wrapper">
            <table className="highscore-table">
              <thead>
                <tr>
                  <th>Plats</th>
                  <th>Spelare</th>
                  <th>Poäng</th>
                  <th>Resultat</th>
                  <th>Datum</th>
                </tr>
              </thead>

              <tbody>
                {sortedScores.map((result, index) => {
                  const percentage = Math.round(
                    (result.score / result.totalQuestions) * 100
                  );

                  return (
                    <tr key={index}>
                      <td>
                        <span
                          className={`highscore-rank ${
                            index === 0
                              ? "highscore-rank--first"
                              : ""
                          }`}
                        >
                          {index + 1}
                        </span>
                      </td>

                      <td className="highscore-player">
                        {result.username}
                      </td>

                      <td>
                        {result.score}/{result.totalQuestions}
                      </td>

                      <td>
                        <span className="highscore-percentage">
                          {percentage}%
                        </span>
                      </td>

                      <td className="highscore-date">
                        {new Date(result.date).toLocaleDateString(
                          "sv-SE"
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="highscore-card__footer">
          <p>
            {highScores.length} registrerade resultat
          </p>

          <Link to="/" className="highscore-button">
            Till startsidan
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HighScorePage;
