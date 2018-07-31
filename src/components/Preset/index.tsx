import * as React from 'react';
import Entry from './Entry';

class Preset extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [
        { indentation: 0, type: 'work', description: 'Ascend', time: 25000 },
        { indentation: 0, type: 'loop', description: 'Warmup', rounds: 3 },
        { indentation: 1, type: 'work', description: 'Ascend', time: 25000 },
        { indentation: 1, type: 'rest', description: 'Low',    time: 90000 },
        { indentation: 0, type: 'loop', description: 'Warmup', rounds: 2 },
        { indentation: 1, type: 'work', description: 'Ascend', time: 25000 },
        { indentation: 1, type: 'rest', description: 'Low',    time: 90000 }
      ],
      editEntry: null,
      focusEntry: 0
    };

    this.FocusUp = this.FocusUp.bind(this);
    this.FocusDown = this.FocusDown.bind(this);
    this.indentEntry = this.indentEntry.bind(this);
    this.unindentEntry = this.unindentEntry.bind(this);
    this.HandleKey = this.HandleKey.bind(this);
  }

  public componentWillMount() {
    document.addEventListener("keydown", this.HandleKey);
  }

  public componentWillUnmount() {
    document.removeEventListener("keydown", this.HandleKey);
  }

  // public render() {
  //   return (
  //     <div>Preset</div>
  //   );
  // }
  public render() {
    const entries = this.state.data
      .map((x: any, i: number) => {
        return (
          <Entry key={i} id={i} data={x}
            focus={i === this.state.focusEntry}
            focusDescription={i === this.state.editEntry}
          />
        )
      });
    
      return <div className="App" onKeyPress={this.HandleKey}>{entries}</div>;
  }


  private FocusUp() {
    const newFocusEntry = this.state.focusEntry - 1;
    if (this.ValidateNewFocusEntry(newFocusEntry)) {
      this.setState({focusEntry: newFocusEntry});
    }
  }

  private FocusDown() {
    const newFocusEntry = this.state.focusEntry + 1;
    if (this.ValidateNewFocusEntry(newFocusEntry)) {
      this.setState({focusEntry: newFocusEntry});
    }
  }
  private indentEntry() {
    const currentData = this.state.data;
    const newIndentation = currentData[this.state.focusEntry].indentation - 1;
    if (this.ValidateFocusEntryNewIndentation(newIndentation)) {
      currentData[this.state.focusEntry].indentation = newIndentation;
      this.setState({data: currentData});
    }
  }
  private unindentEntry() {
    const currentData = this.state.data;
    const newIndentation = currentData[this.state.focusEntry].indentation + 1;
    if (this.ValidateFocusEntryNewIndentation(newIndentation)) {
      currentData[this.state.focusEntry].indentation = newIndentation;
      this.setState({data: currentData});
    }
  }

  private ToggleEditDescription() {
    this.state.editEntry === null
      ? this.setState({editEntry: this.state.focusEntry})
      : this.setState({editEntry: null})
  }

  private stopEditing() {
    if (this.state.editEntry !== null) {this.setState({editEntry: null})};
  }

  private HandleKey(e: { keyCode: any; }) {
    // console.log(e.keyCode);
    switch (e.keyCode) {
      case 37:
      case 72:
        // if (e.ctrlKey) {console.log('Ctrl!')};
        if (this.state.editEntry !== null) {break};
        this.indentEntry(); break;
      case 38:
      case 75:
        // if (e.ctrlKey) console.log('Ctrl!');
        if (this.state.editEntry !== null) {break};
        this.FocusUp(); break;
      case 39:
      case 76:
        // if (e.ctrlKey) console.log('Ctrl!');
        if (this.state.editEntry !== null) {break};
        this.unindentEntry(); break;
      case 40:
      case 74:
        // if (e.ctrlKey) {console.log('Ctrl!')};
        if (this.state.editEntry !== null) {break};
        this.FocusDown(); break;
      // case 32: // SPACE
      //   if (this.state.editEntry !== null) break;
      //   this.ToggleEditDescription(); break;
      case 113:
        this.ToggleEditDescription(); break;
      case 13: // ENTER
        this.ToggleEditDescription(); break;
      case 27: // Escape
        this.stopEditing(); break;
      default:
        // console.log(e.keyCode);
        break;
    }
  }

  private ValidateNewFocusEntry(newFocusEntry: any) {
    if (newFocusEntry < 0 ) { return false; }
    if (newFocusEntry > this.state.data.length -1 ) { return false; }
    return true;
  
  }

  private ValidateFocusEntryNewIndentation(newIndentation: any) {
    if (newIndentation < 0 ) { return false; }
    return true;
  }
}

export default Preset;
