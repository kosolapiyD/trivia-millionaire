import { Button, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { moneyPyramid } from '../components/money-pyramid/moneyPyramidArr';

const FinalScorePage = () => {

    const { state } = useLocation();
    const navigate = useNavigate();

    const moneyWon: { amount: string }[] = moneyPyramid.filter(item => item.id === state);

    const tyStyle = { fontWeight: 'bold', color: '#1976d2' }

    return (
        <div>
            <>
                {state ?
                    <div>
                        <Typography variant="h5" style={tyStyle}>Congratulations</Typography>
                        <Typography variant="h3" style={tyStyle}>You won {moneyWon[0]?.amount}</Typography>
                    </div>
                    :
                    <Typography variant="h4" style={tyStyle}>You Won No Money</Typography>
                }
            </>
            <Button fullWidth variant="contained" style={{ marginTop: '30px' }}
                onClick={(e) => {
                    e.preventDefault()
                    navigate('/', { replace: true });
                }}
            >
                Start new game
            </Button>
        </div>

    )
}

export default FinalScorePage