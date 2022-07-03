import { decode } from 'html-entities';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorElem from '../components/error/ErrorElem';
import MoneyPyramid from '../components/money-pyramid/MoneyPyramid';
import ProgressLoader from '../components/progress-loader/ProgressLoader';
import Timer from '../components/timer/Timer';
import { LocationType, TriviaDataResponseType, TriviaDataType } from '../types/types';
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
    const [error, setError] = useState({ isErr: false, errCode: null, errMsg: '' });
    const [isLoading, setIsLoading] = useState(true);

    const [questionIndex, setQuestionIndex] = useState(0);
    const [allAnswers, setAllAnswers] = useState<string[]>([]);

    const timerDuration: number = 20;

    useEffect(() => {
        getTriviaData();
    }, [null]);

    const getTriviaData = async () => {
        const triviaDataResponse: TriviaDataResponseType = await services
            .fetchTriviaData(`&category=${category}&difficulty=${difficulty}&type=multiple`)
            .catch(error => setError({ isErr: true, errCode: error.code, errMsg: error.message }))
            .finally(() => setIsLoading(false));
        setTriviaData(triviaDataResponse.results);
    }

    const navigateToFinalScreen = () => {
        navigate('/final-score', { replace: true, state: questionIndex });
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
            // if no answer chosen after 20 seconds
            const timer = setTimeout(() => {
                let answerElements: HTMLCollectionOf<Element> = document.getElementsByClassName('answer');
                for (let i = 0; i < answerElements.length; i++) {
                    if (answerElements[i].textContent === triviaItem.correct_answer) {
                        answerElements[i].classList.add('late-correct');
                        const finalScreenTimeout = setTimeout(() => {
                            navigateToFinalScreen();
                        }, 2000);
                        return () => clearTimeout(finalScreenTimeout);
                    }
                }
            }, timerDuration * 1000);
            return () => clearTimeout(timer);
        }
    }, [triviaData, questionIndex])

    const handleOnAnswerClick = (target: EventTarget, answer: string) => {
        const correctAnswer = triviaData[questionIndex].correct_answer;
        const clickedElem = target as HTMLElement;
        if (answer === correctAnswer) {
            clickedElem.classList.add('correct');
        } else {
            clickedElem.classList.add('wrong');
        }

        const clickTimer = setTimeout(() => {
            if (answer === correctAnswer) {
                if (questionIndex + 1 < triviaData.length) {
                    clickedElem.classList.remove('correct');
                    setQuestionIndex(questionIndex + 1);
                } else {
                    navigateToFinalScreen();
                }
            } else {
                navigateToFinalScreen();
            }
        }, 1700);
        return () => clearTimeout(clickTimer);
    }

    return (
        <>
            {isLoading ?
                <ProgressLoader /> :
                <>
                    {error.isErr ?
                        <ErrorElem errCode={error.errCode} errMsg={error.errMsg} /> :
                        <>
                            {triviaData.length > 0 &&
                                <>
                                    <div className='trivia-main-wrapper'>
                                        <div className='top'>
                                            <Timer timerDuration={timerDuration} />
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
                                                            onClick={({ target }) => handleOnAnswerClick(target, answer)}
                                                        >
                                                            {decode(answer)}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <MoneyPyramid questionIndex={questionIndex} />
                                </>
                            }
                        </>
                    }
                </>
            }
        </>
    )
}

export default GameProcessPage;