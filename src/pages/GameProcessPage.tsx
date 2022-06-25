import { Box, Button, CircularProgress } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LocationType, TriviaDataResponseType, TriviaDataType } from '../types/types';
import { decode } from 'html-entities';
import services from '../utils/utils';

const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
};

const GameProcessPage = () => {
    // console.log('GameProcessPage');
    const { state } = useLocation() as LocationType;
    const navigate = useNavigate();
    const category = state.category;
    const difficulty = state.difficulty;

    const [triviaData, setTriviaData] = useState<TriviaDataType[]>([]);
    const [error, setError] = useState({ isErr: false, errMsg: '' });
    const [isLoading, setIsLoading] = useState(true);

    const [questionIndex, setQuestionIndex] = useState(0);
    const [allAnswers, setAllAnswers] = useState<string[]>([]);

    console.log('triviaData :>> ', triviaData);

    useEffect(() => {
        getTriviaData();
    }, [null]);

    const getTriviaData = async () => {
        const triviaDataResponse: TriviaDataResponseType = await services
            .fetchTriviaData(`&category=${category}&difficulty=${difficulty}&type=multiple`)
            .catch(error => setError({ isErr: true, errMsg: error.message }))
            .finally(() => setIsLoading(false));
        setTriviaData(triviaDataResponse.results);
    }

    useEffect(() => {
        if (triviaData.length > 0) {
            const triviaItem = triviaData[questionIndex];
            const answers: string[] = [...triviaItem.incorrect_answers]
            answers.splice(
                getRandomInt(triviaItem.incorrect_answers.length),
                0,
                // put the correct answer to some random position
                triviaItem.correct_answer
            );
            setAllAnswers(answers);
        }
    }, [triviaData, questionIndex])

    const moneyPyramid = useMemo(() =>
        [
            { id: 1, amount: "$ 64.000" },
            { id: 2, amount: "$ 125.000" },
            { id: 3, amount: "$ 250.000" },
            { id: 4, amount: "$ 500.000" },
            { id: 5, amount: "$ 1.000.000" }
        ].reverse(),
        []);

    const handleOnAnswerClick = (answer: string) => {
        // console.log('answer :>> ', answer);
        const correctAnswer = triviaData[questionIndex].correct_answer;
        if (answer === correctAnswer) {
            console.log('correctAnswer :>> ', correctAnswer);
            // setQuestionIndex(questionIndex + 1);
        }

        if (questionIndex + 1 < triviaData.length) {
            setQuestionIndex(questionIndex + 1);
        } else {
            // navigate to final screen after last question
            navigate('/final-score');
        }
    }

    if (isLoading) {
        return (
            <Box mt={20} sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    const MoneyPyramidElem = () => (
        <div className='pyramid'>
            <ul className='moneyList'>
                {moneyPyramid.map(m => (
                    <li key={m.id} className={questionIndex + 1 === m.id ? 'moneyListItem active' : 'moneyListItem'}>
                        <span className='moneyListItemNumber'>{m.id}</span>
                        <span className='moneyListItemAmount'>{m.amount}</span>
                    </li>
                ))}
            </ul>
        </div>
    )

    return (
        <>
            {triviaData &&
                <>
                    <div className='trivia-main-wrapper'>
                        <div className='top'>
                            <div className="timer">
                                TIMER
                            </div>
                        </div>
                        <div className="bottom">
                            <div className='trivia'>
                                <div className='question'>
                                    {decode(triviaData[questionIndex].question)}
                                </div>
                                <div className='answers'>
                                    {allAnswers.map((answer, id) => (
                                        <div key={id}
                                            className='answer'
                                            onClick={() => handleOnAnswerClick(answer)}
                                        >
                                            {decode(answer)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <MoneyPyramidElem />
                </>
            }
        </>
    )
}

export default GameProcessPage;