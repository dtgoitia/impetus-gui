import * as React from 'react';
import Detail from './Detail';
import './Entry.css';

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
        style={{width: "400px", marginLeft: `${2 * this.props.data.indentation}em`}}
      >
        <div className="vertical-bar" style={{backgroundColor: this.GetColorFromType(this.state.type)}}>&nbsp;</div>
        <div className="icon">{this.state.icon}</div>
        <div className="data">
          <div className="description">
            <input ref={this.textInput} type="text" value={this.state.description} onChange={this.handleChange} />
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

  private GetColorFromType(type: any): string {
    switch (type) {
      case "work":
        return 'Red';
      case "rest":
        return 'LawnGreen';
      default:
        return "Black";
    }
  }

  private handleChange(event: any): void {
    this.setState({description: event.target.value});
  }

  private focusTextInput(): void {
    this.textInput.current.focus();
  }
}

export default Entry;
