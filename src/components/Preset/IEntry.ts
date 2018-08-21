export interface IEntry {
  description: string;
  editModeOn: boolean;
  icon?: string;
  indentation: number;
  type: string;
}
export interface ILoopEntry extends IEntry {
  rounds: number;
}

export interface IWorkRestEntry extends IEntry {
  time: number;
}
