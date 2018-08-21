import * as React from 'react';
import Detail from './Detail';
import './Entry.css';
import { EntryBar } from './EntryBar';
import EntryIcon from './EntryIcon';
import { IEntry } from './IEntry';

interface IEntryProps {
  data: IEntry;
  focus: boolean;
  focusDetailDescription: boolean;
  focusEntryDescription: boolean;
  id: number;
  key: number;
  detailDescriptionHandler(rounds: number): void;
  entryDescriptionHandler(description: string): void;
}

class Entry extends React.Component<IEntryProps, any> {
  public entryDescriptionRef: React.RefObject<HTMLInputElement>;
  constructor(props: IEntryProps) {
    super(props);
    this.entryDescriptionRef = React.createRef();
    this.handleEntryChange = this.handleEntryChange.bind(this);
    this.handleDetailChange = this.handleDetailChange.bind(this);
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  public componentDidUpdate(prevProps: IEntryProps, prevState: IEntryProps): void {
    const entryDescriptionWillBlur: boolean = prevProps.focusEntryDescription === true
      && this.props.focusEntryDescription === false;
    const entryDescriptionWillFocus: boolean = prevProps.focusEntryDescription === false
      && this.props.focusEntryDescription === true;

    switch (true) {
      case entryDescriptionWillBlur:
        this.blurTextInput(this.entryDescriptionRef); break;
      case entryDescriptionWillFocus:
        this.focusTextInput(this.entryDescriptionRef); break;
      default:
        break;
    }
  }

  public render() {
    const entryClass: string = `entry${this.props.focus ? ' entry-focused' : ''}`;
    const entryStyle: any = {
      width: "400px",
      marginLeft: `${2 * this.props.data.indentation}em`
    };
    return (
      <div className={entryClass} style={entryStyle}>
        <EntryBar entryType={this.props.data.type} />
        <EntryIcon icon={this.props.data.icon} />
        <div className="data">
          <div className="description">
            <input onChange={this.handleEntryChange} ref={this.entryDescriptionRef}
              type="text" value={this.props.data.description}
            />
          </div>
          <div className="details">
            <Detail data={this.props.data} changer={this.handleDetailChange}
              editModeOn={this.props.focusDetailDescription} />
          </div>
        </div>
      </div>
    );
  }

  private blurTextInput(ref: any): void {
    ref.current.blur();
  }

  private handleDetailChange(event: any): void {
    const updatedInputValue: string = event.target.value;
    const rounds: number = Number(updatedInputValue);
    this.props.detailDescriptionHandler(rounds);
  }
  private handleEntryChange(event: any): void {
    const updatedInputValue: string = event.target.value;
    this.props.entryDescriptionHandler(updatedInputValue);
  }

  private focusTextInput(ref: any): void {
    ref.current.focus();
  }
}

export default Entry;
