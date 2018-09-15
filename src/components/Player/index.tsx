import * as React from 'react';
import './Player.css';

interface IProcessedEntry {
  description: string;
  duration: number;
  start: number;
  end: number;
}
type IPreset = IProcessedEntry[];

class Player extends React.Component<any, any> {
  public processedPreset: IPreset = [
    // Validation TODO
    //  - entries are sorted based on start/end time
    //  - start <= end
    //  - entries cannot overlap on time
    { description: 'Work 1', duration: 2000, start:    0, end:  2000},
    { description: 'Rest 1', duration: 3000, start: 2000, end:  5000},
    { description: 'Work 2', duration: 3000, start: 5000, end:  8000},
    { description: 'Rest 2', duration: 4000, start: 8000, end: 12000},
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      currentEntry: this.processedPreset[0],
      elapsedTime: 0,
      intervalId: -1,
      processedPreset: this.processedPreset,
      watchInterval: 200
    }

    this.getCurrentBtimer = this.getCurrentBtimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.restartTimerEntry = this.restartTimerEntry.bind(this);
    this.skipEntry = this.skipEntry.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  public render(): JSX.Element {
    const entry: IProcessedEntry = this.state.currentEntry;
    return (
      <div>
        <div>Current entry: {entry.description} ({entry.start}-{entry.end})</div>
        <div>Elapsed time: {this.state.elapsedTime / 1000}</div>
        <button onClick={this.startTimer}>START</button>
        <button onClick={this.pauseTimer}>PAUSE</button>
        <button onClick={this.stopTimer}>STOP</button>
        <button onClick={this.restartTimerEntry}>RESTART ENTRY</button>
        <button onClick={this.skipEntry}>SKIP</button>
      </div>
    );
  }

  private getCurrentBtimer(elapsedTime: number, preset: IPreset): IProcessedEntry|null {
    for (const entry of preset) {
      if (entry.start <= elapsedTime && elapsedTime < entry.end) {
        return entry;
      }
    }

    if (elapsedTime === preset[preset.length - 1].end) {
      return preset[preset.length - 1];
    }

    return null;
  }

  private pauseTimer(): void {
    clearInterval(this.state.intervalId);
    this.setState({intervalId: -1});
  }

  private restartTimerEntry(): void {
    const currentEntryStartTime: number = this.state.currentEntry.start;
    this.setState({elapsedTime: currentEntryStartTime});
  }

  private skipEntry(): void {
    const currentEntryStartTime: number = this.state.currentEntry.end;
    this.setState({elapsedTime: currentEntryStartTime});
  }

  private startTimer(): void {
    if (this.state.intervalId < 0) {
      const intervalId: number = setInterval(this.updateState, this.state.watchInterval);
      this.setState({intervalId});
    }
    this.setState({currentEntry: this.getCurrentBtimer(this.state.elapsedTime, this.processedPreset)});
  }

  private stopTimer(): void {
    this.pauseTimer();
    this.setState({
      currentEntry: this.getCurrentBtimer(0, this.processedPreset),
      elapsedTime: 0
    });
  }

  private updateState(): void {
    const elapsedTime: number = this.state.elapsedTime + this.state.watchInterval;
    const currentEntry: IProcessedEntry|null = this.getCurrentBtimer(elapsedTime, this.state.processedPreset);
    if (currentEntry === null) { this.pauseTimer(); return; }
    this.setState({currentEntry, elapsedTime});
  }
}

export default Player;
