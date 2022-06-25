import { Box, Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LocationType, TriviaDataResponseType, TriviaDataType } from '../types/types';
import { decode } from 'html-entities';
import services from '../utils/utils';

const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
};

const GameProcessPage = () => {
    // console.log('GameProcessPage');
    const { state } = useLocation() as LocationType;
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

    if (isLoading) {
        return (
            <Box mt={20} sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            {triviaData &&
                <div className='trivia-wrapper'>
                    <div className='question'>
                        {decode(triviaData[questionIndex].question)}
                    </div>
                    <div className='answers'>
                        {allAnswers.map((answer, id) => (
                            <div key={id}
                                className='answer'>
                                {decode(answer)}
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    )
}

export default GameProcessPage;