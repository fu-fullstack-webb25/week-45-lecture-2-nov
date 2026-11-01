import HomePage from "../pages/homepage/HomePage";
import QuizPage from "../pages/quizpage/QuizPage";
import ResultPage from '../pages/resultpage/ResultPage';
import HighScorePage from "../pages/highscorepage/HighScorePage";
import Layout from "../components/layout/Layout";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path : '/',
        element : <Layout />,
        children : [
            {
                index : true,
                element : <HomePage />
            },
            {
                path : 'quiz',
                element : <QuizPage />
            },
            {
                path : 'result',
                element : <ResultPage />
            },
            {
                path : 'highscore',
                element : <HighScorePage />
            },
        ] 
    }
]);

export default router;