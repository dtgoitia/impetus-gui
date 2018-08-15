import * as React from 'react';
import Entry from './Entry';

interface IWorkEntry {
  indentation: number;
  type: "work";
  description: string;
  time: number;
}

class Preset extends React.Component<any, any> {
  private readonly DEFAULT_WORK_ENTRY: IWorkEntry = {
    description: 'Ascend',
    indentation: 0,
    time: 25000,
    type: 'work'
  };

  public constructor(props: any) {
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
    this.IndentEntry = this.IndentEntry.bind(this);
    this.UnindentEntry = this.UnindentEntry.bind(this);
    this.HandleKey = this.HandleKey.bind(this);
  }

  public componentWillMount() {
    document.addEventListener("keydown", this.HandleKey);
  }

  public componentWillUnmount() {
    document.removeEventListener("keydown", this.HandleKey);
  }

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
    
      return <div className="preset" onKeyPress={this.HandleKey}>{entries}</div>;
  }

  private AddEntry(): any {
    const newEntry: IWorkEntry = this.DEFAULT_WORK_ENTRY;
    const currentData = this.state.data;
    currentData.push(newEntry);
    this.setState({data: currentData});
  }

  private FocusDown() {
    const newFocusEntry = this.state.focusEntry + 1;
    if (this.ValidateNewFocusEntry(newFocusEntry)) {
      this.setState({focusEntry: newFocusEntry});
    }
  }

  private FocusUp() {
    const newFocusEntry = this.state.focusEntry - 1;
    if (this.ValidateNewFocusEntry(newFocusEntry)) {
      this.setState({focusEntry: newFocusEntry});
    }
  }

  private IndentEntry() {
    const focusedEntryIndex: number = this.state.focusEntry;
    const updatedData = this.state.data;
    const updatedFocusedEntry = {...updatedData[focusedEntryIndex]};
    const newIndentation = updatedFocusedEntry.indentation + 1;
    if (this.ValidateFocusEntryNewIndentation(newIndentation)) {
      updatedFocusedEntry.indentation = newIndentation;
      updatedData.splice(focusedEntryIndex, 1, updatedFocusedEntry);
      this.setState({data: updatedData});
    }
  }

  

  private HandleKey(e: { keyCode: any; }) {
    // tslint:disable-next-line:no-console
    // console.log(e.keyCode);
    switch (e.keyCode) {
      case 37:
      case 72:
        // if (e.ctrlKey) {console.log('Ctrl!')};
        if (this.state.editEntry !== null) {break};
        this.UnindentEntry(); break;
      case 38:
      case 75:
        // if (e.ctrlKey) console.log('Ctrl!');
        if (this.state.editEntry !== null) {break};
        this.FocusUp(); break;
      case 39:
      case 76:
        // if (e.ctrlKey) console.log('Ctrl!');
        if (this.state.editEntry !== null) {break};
        this.IndentEntry(); break;
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
        this.StopEditing(); break;
      case 107: // +
        this.AddEntry(); break;
      default:
        // console.log(e.keyCode);
        break;
    }
  }

  private StopEditing() {
    if (this.state.editEntry !== null) {this.setState({editEntry: null})};
  }

  private ToggleEditDescription() {
    this.state.editEntry === null
      ? this.setState({editEntry: this.state.focusEntry})
      : this.setState({editEntry: null})
  }
  private UnindentEntry() {
    const focusedEntryIndex: number = this.state.focusEntry;
    const updatedData = this.state.data;
    const updatedFocusedEntry = {...updatedData[focusedEntryIndex]};
    const newIndentation = updatedFocusedEntry.indentation - 1;
    if (this.ValidateFocusEntryNewIndentation(newIndentation)) {
      updatedFocusedEntry.indentation = newIndentation;
      updatedData.splice(focusedEntryIndex, 1, updatedFocusedEntry);
      this.setState({data: updatedData});
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
