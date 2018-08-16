import * as React from 'react';

const DEFAULT_TIME = 25000;

/**
 * Format time in seconds to a string as 'hh:mm:ss'.
 * @param timeInSeconds 
 */
const FormatTime = (timeInSeconds: number): string => {
  const seconds: number = parseInt(((timeInSeconds / 1000) % 60).toString(), 10);
  const minutes: number = parseInt(((timeInSeconds / (1000 * 60)) % 60).toString(), 10);
  const hours: number = parseInt(((timeInSeconds / (1000 * 60 * 60)) % 24).toString(), 10);

  const formattedHours = (hours < 10) ? `0${hours}` : hours;
  const formattedMinutes = (minutes < 10) ? `0${minutes}` : minutes;
  const formattedSeconds = (seconds < 10) ? `0${seconds}` : seconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

interface IWorkRestDetailDataProps {
  pause?: boolean;
  time?: number;
}

const WorkDetail = ({time = DEFAULT_TIME, pause = false}: IWorkRestDetailDataProps) => {
  const formattedTime: string = FormatTime(time);
  return (
    <div className="details work-detail">
      Time <span className="formatted-time">{formattedTime}</span>
    </div>
  );
};

export default WorkDetail;
