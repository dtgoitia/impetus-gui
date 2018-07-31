import * as React from 'react';

class WorkDetail extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      formattedTime: this.FormatTime(this.props.time)
    };
  }

  public render() {
    return (
      <div className="details work-detail">
        Time <span className="formatted-time">{this.state.formattedTime}</span>
      </div>
    );
  }

  private FormatTime (timeInSeconds: number): string {
    const seconds: number = parseInt(((timeInSeconds/1000)%60).toString(), 10);
    const minutes: number = parseInt(((timeInSeconds/(1000*60))%60).toString(), 10);
    const hours: number = parseInt(((timeInSeconds/(1000*60*60))%24).toString(), 10);

    const formattedHours   = (hours   < 10) ? `0${hours}`   : hours;
    const formattedMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const formattedSeconds = (seconds < 10) ? `0${seconds}` : seconds;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
}

export default WorkDetail;
