import { Box, Button, SelectChangeEvent, Typography } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectField from '../components/select-field/SelectField';
import { SelectFieldType, TriviaCategoryResponseType } from '../types/types';
import services from '../utils/utils';

import './all-pages.scss';

const StartPage = () => {

    const [categories, setCategories] = useState<SelectFieldType[]>([]);
    const [error, setError] = useState({ isErr: false, errMsg: '' });
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
            .catch(error => setError({ isErr: true, errMsg: error.message }))
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
        <div className='page-container'>
            <Typography variant="h3" fontWeight="bold">Trivia Millionaire App</Typography>
            <form onSubmit={handleSubmit}>
                {categories &&
                    <>
                        <SelectField onChange={handleChange} value={chosenCategory} data={categories} label="Category" />
                        <SelectField onChange={handleChange} value={chosenDifficulty} data={difficultyOptions} label="Difficulty" />
                        <div className='btn-box'>
                            <Button fullWidth variant="contained" type="submit">
                                Get Started
                            </Button>
                        </div>
                    </>
                }
            </form>
        </div>
    )
}

export default StartPage