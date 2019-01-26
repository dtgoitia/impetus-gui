import { ILoopEntry, IWorkRestEntry } from './IEntry';

export interface IPreset {
  data: ILoopEntry | IWorkRestEntry;
  indentation: number;
  rounds: number;
  type: string;  // consider converting this to an enum
}
