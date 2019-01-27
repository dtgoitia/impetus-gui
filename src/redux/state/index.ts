import { IPresetExplorerState } from './IPresetExplorerState';
import { ITodo } from './ITodo';

export interface IState {
  readonly todos?: ITodo[];
  readonly presets: IPresetExplorerState;
};
