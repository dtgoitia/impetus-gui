import * as React from 'react';
import Detail from './Detail';
import './Entry.css';
import { EntryBar } from './EntryBar';
import EntryIcon from './EntryIcon';

class Entry extends React.Component<any, any> {
  public textInput: any;
  constructor(props: any) {
    super(props);
    this.state = {
      description: this.props.data.description,
      icon: 'X', // loop, rest, work
      type: this.props.data.type
    };

    this.handleChange = this.handleChange.bind(this);

    // create a ref to store the textInput DOM element
    // to handle input focus and blur
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  public render() {
    return (
      <div className={`entry${this.props.focus ? ' entry-focused' : ''}`}
        style={{ width: "400px", marginLeft: `${2 * this.props.data.indentation}em` }}
      >
        <EntryBar entryType={this.props.data.type} />
        <EntryIcon icon={this.props.data.icon}/>
        <div className="data">
          <div className="description">
            <input onChange={this.handleChange} ref={this.textInput}
              type="text" value={this.props.data.description}
            />
          </div>
          <div className="details">
            <Detail data={this.props.data} />
          </div>
        </div>
      </div>
    );
  }

  public componentDidUpdate(prevProps: any, prevState: any): void {
    if (prevProps.focusDescription === false && this.props.focusDescription === true) {
      this.focusTextInput();
    } else if (prevProps.focusDescription === true && this.props.focusDescription === false) {
      (document.activeElement as HTMLElement).blur();
      // .blur() is only guaranteed to exist on HTMLElements, not all Elements.
      // https://github.com/Microsoft/TypeScript/issues/5901
    }
  }

  private handleChange(event: any): void {
    const updatedInputValue: string = event.target.value;
    this.props.descriptionHandler(updatedInputValue);
  }

  private focusTextInput(): void {
    this.textInput.current.focus();
  }
}

export default Entry;
