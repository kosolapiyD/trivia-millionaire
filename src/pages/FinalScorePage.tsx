import { Button, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { moneyPyramid } from '../components/money-pyramid/moneyPyramidArr';

import './final-score-page.scss';

const FinalScorePage = () => {

    const { state } = useLocation();
    const navigate = useNavigate();

    const moneyWon: { amount: string }[] = moneyPyramid.filter(item => item.id === state);

    return (
        <div className='final-page-wrapper'>
            <>
                {state ?
                    <div className='final-page-title-wrapper'>
                        <span className='title-a'>Congratulations</span>
                        <span className='title-b'>You won {moneyWon[0]?.amount}</span>
                    </div>
                    :
                    <span className='title-c'>You Won No Money</span>
                }
            </>
            <div className='end-btn-box'>
                <Button fullWidth variant="contained" onClick={(e) => {
                    e.preventDefault()
                    navigate('/', { replace: true });
                }}
                >
                    Start new game
                </Button>
            </div>

        </div>

    )
}

export default FinalScorePage;