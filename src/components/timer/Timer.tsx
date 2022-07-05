import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import './timer.scss';

type Props = {
    timerDuration: number
}

const Timer = ({ timerDuration }: Props) => {

    const UrgeWithPleasureComponent = () => (
        <CountdownCircleTimer
            isPlaying
            duration={timerDuration}
            colors={['#00b300', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[12, 7, 3, 0]}
            size={100}
            strokeWidth={8}
            trailColor={"rgba(255, 255, 255, 0.1)"}
        >
            {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
    )

    return (
        <div className="timer">
            <UrgeWithPleasureComponent />
        </div>
    )
}

export default Timer;