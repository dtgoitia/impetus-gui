import * as React from 'react';
import { Beep } from '../common/beep';
import DisplayEntry from './DisplayEntry';
import { DisplayEntryStatus } from './DisplayEntryStatus';
import { IProcessedEntry } from './IProcessedEntry';
import './Player.css';
import ProgressBar from './ProgressBar';

interface IPlayerState {
  // currentEntry: IProcessedEntry;
  currentEntryIndex: number;
  elapsedTime: number;
  intervalId: number;
  processedPreset: IProcessedEntry[];
  watchInterval: number;
}

class Player extends React.Component<any, IPlayerState> {
  public processedPreset: IProcessedEntry[] = [
    // Validation TODO
    //  - entries are sorted based on start/end time
    //  - start <= end
    //  - entries cannot overlap on time
    { description: 'Work 1', duration: 2000, start:     0, end:  2000},
    { description: 'Rest 1', duration: 3000, start:  2000, end:  5000},
    { description: 'Work 2', duration: 3000, start:  5000, end:  8000},
    { description: 'Rest 2', duration: 2000, start:  8000, end: 10000},
    { description: 'Rest 2', duration: 2000, start: 10000, end: 12000},
  ];
  private beep: Beep;

  constructor(props: any) {
    super(props);
    this.state = {
      currentEntryIndex: 0,
      elapsedTime: 0,
      intervalId: -1,
      processedPreset: this.processedPreset,
      watchInterval: 200
    }

    this.getCurrentEntryIndex = this.getCurrentEntryIndex.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.restartTimerEntry = this.restartTimerEntry.bind(this);
    this.skipEntry = this.skipEntry.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.updateState = this.updateState.bind(this);

    this.beep = new Beep();
  }

  public render(): JSX.Element {
    const i: number = this.state.currentEntryIndex;
    const n: number = this.state.processedPreset.length;
    const emptyEntry = <DisplayEntry
      entry={{description: '', duration: 0, start: 0, end: 0}}
      status={DisplayEntryStatus.Next} />;
    const entries = <div id={'entry-display'}>
      {i > 0
        ? <DisplayEntry entry={this.state.processedPreset[i - 1]} status={DisplayEntryStatus.Completed} />
        : null
      }
      <DisplayEntry entry={this.state.processedPreset[i]} status={DisplayEntryStatus.Running} />
      {i < n
        ? <DisplayEntry entry={this.state.processedPreset[i + 1]} status={DisplayEntryStatus.Next} />
        : emptyEntry
      }
      {i + 1 < n
        ? <DisplayEntry entry={this.state.processedPreset[i + 2]} status={DisplayEntryStatus.Next} />
        : emptyEntry
      }
    </div>;
    return (
      <div>{entries}
        <ProgressBar
          elapsedTime={this.state.elapsedTime}
          flatPreset={this.processedPreset}
        />
        <div>Elapsed time: {this.state.elapsedTime / 1000}</div>
        <button onClick={this.startTimer}>START</button>
        <button onClick={this.pauseTimer}>PAUSE</button>
        <button onClick={this.stopTimer}>STOP</button>
        <button onClick={this.restartTimerEntry}>RESTART ENTRY</button>
        <button onClick={this.skipEntry}>SKIP</button>
      </div>
    );
  }

  private getCurrentEntryIndex(elapsedTime: number): number {
    const preset: IProcessedEntry[] = this.state.processedPreset;
    for (let i = 0; i < preset.length; i++) {
      const entry: IProcessedEntry = preset[i];
      if (entry.start <= elapsedTime && elapsedTime < entry.end) {
        return i;
      }
    }

    if (elapsedTime === preset[preset.length - 1].end) {
      return preset.length - 1;
    }

    return -1;
  }

  private pauseTimer(): void {
    clearInterval(this.state.intervalId);
    this.setState({intervalId: -1});
  }

  private restartTimerEntry(): void {
    const currentEntryStartTime: number = this.state.processedPreset[this.state.currentEntryIndex].start;
    this.setState({elapsedTime: currentEntryStartTime});
  }

  private skipEntry(): void {
    const currentEntryStartTime: number = this.state.processedPreset[this.state.currentEntryIndex].end;
    this.setState({elapsedTime: currentEntryStartTime});
  }

  private startTimer(): void {
    if (this.state.intervalId < 0) {
      const intervalId: number = window.setInterval(this.updateState, this.state.watchInterval);
      this.setState({intervalId});
    }

    const currentEntryIndex: number = this.getCurrentEntryIndex(this.state.elapsedTime);
    this.setState({currentEntryIndex});
  }

  private stopTimer(): void {
    this.pauseTimer();
    this.setState({
      currentEntryIndex: 0,
      elapsedTime: 0
    });
  }

  private updateState(): void {
    const elapsedTime: number = this.state.elapsedTime + this.state.watchInterval;
    const currentEntryIndex: number = this.getCurrentEntryIndex(this.state.elapsedTime);
    const currentEntry: IProcessedEntry = this.state.processedPreset[currentEntryIndex];
    const countdown: number = 1000;
    const x: number = currentEntry.end - countdown;
    if (x > elapsedTime) {
      this.beep.high();
    }

    if (currentEntryIndex === -1) {
      this.pauseTimer();
      return;
    }

    this.setState({currentEntryIndex, elapsedTime});
  }
}

export default Player;
