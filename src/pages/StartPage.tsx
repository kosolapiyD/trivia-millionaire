import { Button, SelectChangeEvent, Typography } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorElem from '../components/error/ErrorElem';
import ProgressLoader from '../components/progress-loader/ProgressLoader';
import SelectField from '../components/select-field/SelectField';
import { SelectFieldType, TriviaCategoryResponseType } from '../types/types';
import services from '../utils/utils';

import './start-page.scss';

const StartPage = () => {

    const [categories, setCategories] = useState<SelectFieldType[]>([]);
    const [error, setError] = useState({ isErr: false, errCode: null, errMsg: '' });
    const [isLoading, setIsLoading] = useState(true);
    // console.log("StartPage", categories);
    const [chosenCategory, setChosenCategory] = useState('');
    const [chosenDifficulty, setChosenDifficulty] = useState('');

    const navigate = useNavigate();

    const difficultyOptions: SelectFieldType[] = [
        { id: "easy", name: "Easy" },
        { id: "medium", name: "Medium" },
        { id: "hard", name: "Hard" }
    ];

    useEffect(() => {
        // console.log('categories.length :>> ', categories.length);
        if (categories.length === 0) {
            getCategories();
        }
    }, [null]);

    const getCategories = async () => {
        // console.log("getCategories");
        const categoriesResponse: TriviaCategoryResponseType = await services
            .fetchCategories()
            .catch(error => setError({ isErr: true, errCode: error.code, errMsg: error.message }))
            .finally(() => setIsLoading(false));
        setCategories(categoriesResponse.trivia_categories);
    }

    const handleChange = ({ target }: SelectChangeEvent) => {
        switch (target.name) {
            case "Category":
                setChosenCategory(target.value);
                break;
            case "Difficulty":
                setChosenDifficulty(target.value);
                break;
            default:
                return;
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        navigate('/game-process', { state: { category: chosenCategory, difficulty: chosenDifficulty } });
    };

    return (
        <div>
            <div className='title-wrapper'>
                <span className='start-page-title'>Trivia Millionaire App</span>
            </div>

            {isLoading ? <ProgressLoader /> :
                <>
                    {
                        error.isErr ?
                            <ErrorElem errCode={error.errCode} errMsg={error.errMsg} />
                            :
                            <form onSubmit={handleSubmit}>
                                {categories &&
                                    <>
                                        <SelectField onChange={handleChange} value={chosenCategory} data={categories} label="Category" />
                                        <SelectField onChange={handleChange} value={chosenDifficulty} data={difficultyOptions} label="Difficulty" />
                                        <div className='start-btn-box'>
                                            <Button fullWidth variant="contained" type="submit">
                                                Get Started
                                            </Button>
                                        </div>
                                    </>
                                }
                            </form>
                    }
                </>
            }
        </div>
    )
}

export default StartPage;