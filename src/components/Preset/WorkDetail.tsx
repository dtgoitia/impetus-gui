import * as React from 'react';

const DEFAULT_TIME: number = 25000;
const TIME_STEP: number = 5000;

/**
 * Format time in seconds to a string as 'hh:mm:ss'.
 * @param timeInSeconds
 */
const formatTime = (timeInSeconds: number|undefined): string => {
  if (timeInSeconds === undefined) { return '00:00:00' };

  const seconds: number = parseInt(((timeInSeconds / 1000) % 60).toString(), 10);
  const minutes: number = parseInt(((timeInSeconds / (1000 * 60)) % 60).toString(), 10);
  const hours: number = parseInt(((timeInSeconds / (1000 * 60 * 60)) % 24).toString(), 10);

  const formattedHours = (hours < 10) ? `0${hours}` : hours;
  const formattedMinutes = (minutes < 10) ? `0${minutes}` : minutes;
  const formattedSeconds = (seconds < 10) ? `0${seconds}` : seconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

interface IWorkRestDetailDataProps {
  changer: any;
  editModeOn: boolean;
  pause?: boolean;
  time?: number;
}

class WorkDetail extends React.Component<IWorkRestDetailDataProps, any> {
  private detailDescription: React.RefObject<HTMLInputElement>;
  constructor(props: IWorkRestDetailDataProps) {
    super(props);
    this.detailDescription = React.createRef();
  }

  public componentDidUpdate(prevProps: IWorkRestDetailDataProps, prevState: IWorkRestDetailDataProps): void {
    const detailDescriptionWillBlur: boolean = prevProps.editModeOn === true
      && this.props.editModeOn === false;
    const detailDescriptionWillFocus: boolean = prevProps.editModeOn === false
      && this.props.editModeOn === true;

    switch (true) {
      case detailDescriptionWillBlur:
        this.blurTextInput(this.detailDescription); break;
      case detailDescriptionWillFocus:
        this.focusTextInput(this.detailDescription); break;
      default:
        break;
    }
  }

  public render() {
    const time: number = this.props.time ? this.props.time : DEFAULT_TIME;
    if (this.props.editModeOn) {
      return (
        <div className="details work-detail">
          <input
            type="number"
            step={TIME_STEP}
            value={time}
            ref={this.detailDescription}
            onChange={this.props.changer} /> miliseconds
        </div>
      );
    }
    const formattedTime: string = formatTime(time);
    return (
      <div className="details work-detail">
        Time <span className="formatted-time">{formattedTime}</span>
      </div>
    );
  }

  private blurTextInput(ref: any): void {
    if (ref.current !== null) {
      ref.current.blur();
    }
  }

  private focusTextInput(ref: any): void {
    ref.current.focus();
  }
}

export default WorkDetail;
