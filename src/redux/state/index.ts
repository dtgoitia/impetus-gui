import { IPresetPreview } from 'src/components/Preset/IPresetPreview';
import { ITodo } from './todo';

export interface IState {
  todos: ITodo[];
  presets: IPresetPreview
};
