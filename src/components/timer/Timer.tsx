import { useEffect, useState } from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const Timer = () => {

    const UrgeWithPleasureComponent = () => (
        <CountdownCircleTimer
            isPlaying
            duration={10}
            colors={['#00b300', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[8, 5, 2, 0]}
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