import * as React from 'react';

const DEFAULT_ROUND_NUMBER = 1;

interface ILoopDetailProps {
  editModeOn: boolean;
  changer: any;
  rounds?: number;
}

class LoopDetail extends React.Component<ILoopDetailProps, any> {
  private detailDescription: React.RefObject<HTMLInputElement>;
  constructor(props: ILoopDetailProps) {
    super(props);
    this.detailDescription = React.createRef();
  }

  public componentDidUpdate(prevProps: ILoopDetailProps, prevState: ILoopDetailProps): void {
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
    const rounds: number = this.props.rounds ? this.props.rounds : DEFAULT_ROUND_NUMBER;
    if (this.props.editModeOn) {
      return (
        <div className="details loop-detail">
          <input
            type="number"
            value={this.props.rounds}
            ref={this.detailDescription}
            onChange={this.props.changer} />
          round{rounds === 1 ? '' : 's'}!
        </div>
      );
    }
    return <div className="details loop-detail">{rounds} round{rounds === 1 ? '' : 's'}!</div>;
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

export default LoopDetail;
