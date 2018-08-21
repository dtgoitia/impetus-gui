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
  descriptionHandler(description: string): void;
}

class Entry extends React.Component<IEntryProps, any> {
  public entryDescription: any;
  public detailDescription: any;
  constructor(props: IEntryProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    // create a ref to store the textInput DOM element
    // to handle input focus and blur
    this.entryDescription = React.createRef();
    this.detailDescription = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
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
        <EntryIcon icon={this.props.data.icon}/>
        <div className="data">
          <div className="description">
            <input onChange={this.handleChange} ref={this.entryDescription}
              type="text" value={this.props.data.description}
            />
          </div>
          <div className="details">
            <Detail data={this.props.data} reference={this.detailDescription} changer={this.handleChange}/>
          </div>
        </div>
      </div>
    );
  }

  public componentDidUpdate(prevProps: IEntryProps, prevState: IEntryProps): void {
    const detailDescriptionWillBlur: boolean = prevProps.focusDetailDescription === true
      && this.props.focusDetailDescription === false;
    const detailDescriptionWillFocus: boolean = prevProps.focusDetailDescription === false
      && this.props.focusDetailDescription === true;
    const entryDescriptionWillBlur: boolean = prevProps.focusEntryDescription === true
      && this.props.focusEntryDescription === false;
    const entryDescriptionWillFocus: boolean = prevProps.focusEntryDescription === false
      && this.props.focusEntryDescription === true;
    
    switch (true) {
      case detailDescriptionWillBlur:
        this.blurTextInput(this.detailDescription); break;
      case detailDescriptionWillFocus:
        this.focusTextInput(this.detailDescription); break;
      case entryDescriptionWillBlur:
        this.blurTextInput(this.entryDescription); break;
      case entryDescriptionWillFocus:
        this.focusTextInput(this.entryDescription); break;
      default:
        break;
    }
  }

  private blurTextInput(ref: any): void {
    ref.current.blur();
  }

  private handleChange(event: any): void {
    const updatedInputValue: string = event.target.value;
    this.props.descriptionHandler(updatedInputValue);
  }

  private focusTextInput(ref: any): void {
    ref.current.focus();
  }
}

export default Entry;
