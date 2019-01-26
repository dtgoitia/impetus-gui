import { Action } from 'redux';
import { IPresetPreview } from 'src/components/Preset/IPresetPreview';
import { ActionTypes } from './actionTypes';

export interface IPresetPreviewAction extends Action {
  preset: IPresetPreview
};

export const addPreset = (preset: IPresetPreview): IPresetPreviewAction => {
  return { type: ActionTypes.AddPreset, preset };
};
