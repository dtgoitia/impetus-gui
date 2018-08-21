import * as React from 'react';
import { getPressedKeys, IKeyPressEvent } from '../common/keyPress';
import Entry from './Entry';
import { EntryType } from './EntryType';
import { IEntry, ILoopEntry, IWorkRestEntry } from './IEntry';

class Preset extends React.Component<any, any> {

  private readonly DEFAULT_LOOP_ENTRY: ILoopEntry = {
    description: 'Loop',
    editModeOn: false,
    indentation: 0,
    rounds: 3,
    type: EntryType.Loop
  };
  private readonly DEFAULT_REST_ENTRY: IWorkRestEntry = {
    description: 'Rest',
    editModeOn: false,
    indentation: 0,
    time: 25000,
    type: EntryType.Rest
  };
  private readonly DEFAULT_WORK_ENTRY: IWorkRestEntry = {
    description: 'Work',
    editModeOn: false,
    indentation: 0,
    time: 35000,
    type: EntryType.Work
  };

  public constructor(props: any) {
    super(props);
    this.state = {
      data: [
        // { indentation: 0, type: 'work', description: 'Ascend', time: 25000 },
        { indentation: 0, type: 'loop', description: 'Warmup', rounds: 3, editModeOn: false },
        { indentation: 0, type: 'loop', description: 'Warmup', rounds: 3, editModeOn: true },
        // { indentation: 1, type: 'work', description: 'Ascend', time: 25000 },
        // { indentation: 1, type: 'rest', description: 'Low',    time: 90000 },
        // { indentation: 0, type: 'loop', description: 'Warmup', rounds: 2 },
        // { indentation: 1, type: 'work', description: 'Ascend', time: 25000 },
        // { indentation: 1, type: 'rest', description: 'Low',    time: 90000 }
      ],
      editEntryDescription: null,
      editDetailDescription: null,
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
            focusEntryDescription={i === this.state.editEntryDescription}
            focusDetailDescription={i === this.state.editDetailDescription}
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

  private HandleKey(event: IKeyPressEvent) {
    const pressedKeys = getPressedKeys(event);
    // tslint:disable-next-line:no-console
    console.log(pressedKeys);
    switch (pressedKeys) {
      case 'ArrowLeft':
      case 'h':
        if (this.InEditMode()) { break };
        this.UnindentEntry(); break;
      case 'ArrowUp':
      case 'k':
        if (this.InEditMode()) { break };
        this.FocusUp(); break;
      case 'ArrowRight':
      case 'l':
        if (this.InEditMode()) { break };
        this.IndentEntry(); break;
      case 'ArrowDown':
      case 'j':
        if (this.InEditMode()) { break };
        this.FocusDown(); break;
      case 'space':
        if (this.InEditMode()) { break };
        this.ToggleEditDetail(); break;
      case 'enter': // ENTER
      case 'F2': // F2
        this.ToggleEditDescription(); break;
      case 'escape': // Escape
        this.StopEditing(); break;

      case 'ctrl+1':
      case 'ctrl+Numpad1':
        if (this.InEditMode()) { break };
        this.AddEntry(EntryType.Loop); break;
      case 'ctrl+2':
      case 'ctrl+Numpad2':
        if (this.InEditMode()) { break };
        this.AddEntry(EntryType.Work); break;
      case 'ctrl+3':
      case 'ctrl+Numpad3':
        if (this.InEditMode()) { break };
        this.AddEntry(EntryType.Rest); break;
      case 'NumpadAdd':
        if (this.InEditMode()) { break };
        this.AddEntry(); break;
      case 'Delete':
      case 'NumpadSubstract':
        if (this.InEditMode()) { break };
        this.RemoveEntry(); break;
      default:
        // tslint:disable-next-line:no-console
        // console.log(e.keyCode);
        break;
    }
  }

  private HandleEntryDescriptionUpdate(description: string): void {
    const focusedEntryIndex: number = this.state.focusEntry;
    const currentData = [...this.state.data];
    const focusedEntry = currentData[focusedEntryIndex];
    focusedEntry.description = description;
    currentData.splice(focusedEntryIndex, 1, focusedEntry)
    this.setState({ data: currentData });
  }
  // private HandleLoopDetailUpdate(rounds: number): void {
  //   const focusedEntryIndex: number = this.state.focusEntry;
  //   const currentData = [...this.state.data];
  //   const focusedEntry: ILoopEntry = currentData[focusedEntryIndex];
  //   focusedEntry.rounds = rounds;
  //   currentData.splice(focusedEntryIndex, 1, focusedEntry)
  //   this.setState({ data: currentData });
  // }

  private IndentEntry(): void {
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

  private InEditMode(): boolean {
    const editEntryDescription: boolean = this.state.editEntryDescription;
    const editDetailDescription: boolean = this.state.editDetailDescription;
    // tslint:disable
    console.log(`editEntryDescription = ${editEntryDescription}`);
    console.log(`editDetailDescription = ${editDetailDescription}`);
    return this.state.editEntryDescription !== null || this.state.editDetailDescription !== null;
  }

  private RemoveEntry(): void {
    const currentData = [...this.state.data];
    currentData.splice(this.state.focusEntry, 1);
    this.setState({ data: currentData });
  }

  private StopEditing() {
    if (this.state.editEntryDescription !== null) { this.setState({ editEntryDescription: null }) };
  }

  private ToggleEditDescription(): void {
    this.state.editEntryDescription === null
      ? this.setState({ editEntryDescription: this.state.focusEntry })
      : this.setState({ editEntryDescription: null })
  }

  private ToggleEditDetail(): void {
    alert('WIP: implement entry detail edition!')
  }

  private UnindentEntry(): void {
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

  private ValidateNewFocusEntry(newFocusEntry: number): boolean {
    if (newFocusEntry < 0) { return false; }
    if (newFocusEntry > this.state.data.length - 1) { return false; }
    return true;

  }

  private ValidateFocusEntryNewIndentation(newIndentation: number): boolean {
    if (newIndentation < 0) { return false; }
    return true;
  }
}

export default Preset;
