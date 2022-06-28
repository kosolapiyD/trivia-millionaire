import { Box, CircularProgress } from '@mui/material';

const ProgressLoader = () => {
    return (
        <Box mt={20} sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    )
}

export default ProgressLoader;