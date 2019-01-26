import { IPresetExplorerState } from './IPresetExplorerState';
import { ITodo } from './ITodo';

export interface IState {
  todos?: ITodo[];
  presets: IPresetExplorerState;
};
