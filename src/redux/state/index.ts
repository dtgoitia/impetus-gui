import { IPresetExplorerState } from '../reducers/presetExplorer';
import { ITodo } from './todo';

export interface IState {
  todos?: ITodo[];
  presets: IPresetExplorerState;
};
