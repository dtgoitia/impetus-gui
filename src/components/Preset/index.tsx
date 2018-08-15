import * as React from 'react';
import Entry from './Entry';
import { EntryType } from './EntryType';
import { IEntry, ILoopEntry, IWorkRestEntry } from './IEntry';


class Preset extends React.Component<any, any> {

  private readonly DEFAULT_LOOP_ENTRY: ILoopEntry = {
    description: 'Loop',
    indentation: 0,
    rounds: 3,
    type: EntryType.Loop
  };
  private readonly DEFAULT_REST_ENTRY: IWorkRestEntry = {
    description: 'Rest',
    indentation: 0,
    time: 25000,
    type: EntryType.Rest
  };
  private readonly DEFAULT_WORK_ENTRY: IWorkRestEntry = {
    description: 'Work',
    indentation: 0,
    time: 35000,
    type: EntryType.Work
  };

  public constructor(props: any) {
    super(props);
    this.state = {
      data: [
        // { indentation: 0, type: 'work', description: 'Ascend', time: 25000 },
        // { indentation: 0, type: 'loop', description: 'Warmup', rounds: 3 },
        // { indentation: 1, type: 'work', description: 'Ascend', time: 25000 },
        // { indentation: 1, type: 'rest', description: 'Low',    time: 90000 },
        // { indentation: 0, type: 'loop', description: 'Warmup', rounds: 2 },
        // { indentation: 1, type: 'work', description: 'Ascend', time: 25000 },
        // { indentation: 1, type: 'rest', description: 'Low',    time: 90000 }
      ],
      editEntry: null,
      focusEntry: 0
    };

    this.FocusUp = this.FocusUp.bind(this);
    this.FocusDown = this.FocusDown.bind(this);
    this.IndentEntry = this.IndentEntry.bind(this);
    this.UnindentEntry = this.UnindentEntry.bind(this);
    this.HandleKey = this.HandleKey.bind(this);
    this.HandleEntryDescriptionUpdate = this.HandleEntryDescriptionUpdate.bind(this);
  }

  public componentWillMount() {
    document.addEventListener("keydown", this.HandleKey);
  }

  public componentWillUnmount() {
    document.removeEventListener("keydown", this.HandleKey);
  }

  public render() {
    const entries = this.state.data
      .map((x: IEntry, i: number) => {
        return (
          <Entry key={i} id={i} data={x}
            focus={i === this.state.focusEntry}
            focusDescription={i === this.state.editEntry}
            descriptionHandler={this.HandleEntryDescriptionUpdate}
          />
        )
      });

    return <div className="preset" onKeyPress={this.HandleKey}>{entries}</div>;
  }

  private AddEntry(entryType: string = EntryType.Work): void {
    let newEntry: IEntry;
    switch (entryType) {
      case EntryType.Loop: { newEntry = this.DEFAULT_LOOP_ENTRY; break; }
      case EntryType.Rest: { newEntry = this.DEFAULT_REST_ENTRY; break; }
      case EntryType.Work: { newEntry = this.DEFAULT_WORK_ENTRY; break; }
      default: { newEntry = this.DEFAULT_WORK_ENTRY; break; }
    }
    const currentData = this.state.data;
    const insertIndex: number = this.state.focusEntry + 1;
    currentData.splice(insertIndex, 0, newEntry)
    this.setState({ data: currentData });
  }

  private FocusDown(): void {
    const newFocusEntry = this.state.focusEntry + 1;
    if (this.ValidateNewFocusEntry(newFocusEntry)) {
      this.setState({ focusEntry: newFocusEntry });
    }
  }

  private FocusUp() {
    const newFocusEntry = this.state.focusEntry - 1;
    if (this.ValidateNewFocusEntry(newFocusEntry)) {
      this.setState({ focusEntry: newFocusEntry });
    }
  }

  private HandleKey(e: { keyCode: any; }) {
    // tslint:disable-next-line:no-console
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 37:  // Left arrow
      case 72:  // H
        // if (e.ctrlKey) {console.log('Ctrl!')};
        if (this.state.editEntry !== null) { break };
        this.UnindentEntry(); break;
      case 38:  // Up arrow
      case 75:  // K
        // if (e.ctrlKey) console.log('Ctrl!');
        if (this.state.editEntry !== null) { break };
        this.FocusUp(); break;
      case 39:  // Right arrow
      case 76:  // L
        // if (e.ctrlKey) console.log('Ctrl!');
        if (this.state.editEntry !== null) { break };
        this.IndentEntry(); break;
      case 40:  // Down arrow
      case 74:  // J
        // if (e.ctrlKey) {console.log('Ctrl!')};
        if (this.state.editEntry !== null) { break };
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

      case 49: // 1 (above keyboard)
      case 97: // 1 (right keyboard)
        this.AddEntry(EntryType.Loop); break;
      case 50: // 2 (above keyboard)
      case 98: // 2 (right keyboard)
        this.AddEntry(EntryType.Work); break;
      case 51: // 3 (above keyboard)
      case 99: // 3 (right keyboard)
        this.AddEntry(EntryType.Rest); break;
      case 107: // +
        this.AddEntry(); break;
      case 109: // -
        this.RemoveEntry(); break;
      default:
        // tslint:disable-next-line:no-console
        // console.log(e.keyCode);
        break;
    }
  }

  private HandleEntryDescriptionUpdate(description: string) {
    const focusedEntryIndex: number = this.state.focusEntry;
    const currentData = [...this.state.data];
    const focusedEntry = currentData[focusedEntryIndex];
    focusedEntry.description = description;
    currentData.splice(focusedEntryIndex, 1, focusedEntry)
    this.setState({ data: currentData });
  }

  private IndentEntry() {
    const focusedEntryIndex: number = this.state.focusEntry;
    const updatedData = this.state.data;
    const updatedFocusedEntry = { ...updatedData[focusedEntryIndex] };
    const newIndentation = updatedFocusedEntry.indentation + 1;
    if (this.ValidateFocusEntryNewIndentation(newIndentation)) {
      updatedFocusedEntry.indentation = newIndentation;
      updatedData.splice(focusedEntryIndex, 1, updatedFocusedEntry);
      this.setState({ data: updatedData });
    }
  }

  private RemoveEntry(): any {
    const currentData = [...this.state.data];
    currentData.splice(this.state.focusEntry, 1);
    this.setState({ data: currentData });
  }

  private StopEditing() {
    if (this.state.editEntry !== null) { this.setState({ editEntry: null }) };
  }

  private ToggleEditDescription() {
    this.state.editEntry === null
      ? this.setState({ editEntry: this.state.focusEntry })
      : this.setState({ editEntry: null })
  }
  private UnindentEntry() {
    const focusedEntryIndex: number = this.state.focusEntry;
    const updatedData = this.state.data;
    const updatedFocusedEntry = { ...updatedData[focusedEntryIndex] };
    const newIndentation = updatedFocusedEntry.indentation - 1;
    if (this.ValidateFocusEntryNewIndentation(newIndentation)) {
      updatedFocusedEntry.indentation = newIndentation;
      updatedData.splice(focusedEntryIndex, 1, updatedFocusedEntry);
      this.setState({ data: updatedData });
    }
  }

  private ValidateNewFocusEntry(newFocusEntry: any) {
    if (newFocusEntry < 0) { return false; }
    if (newFocusEntry > this.state.data.length - 1) { return false; }
    return true;

  }

  private ValidateFocusEntryNewIndentation(newIndentation: any) {
    if (newIndentation < 0) { return false; }
    return true;
  }
}

export default Preset;
