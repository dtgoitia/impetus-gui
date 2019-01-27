import { Action } from 'redux';
import { IPresetPreview } from 'src/components/Preset/IPresetPreview';
import { ActionTypes } from './actionTypes';

interface IAddPresetPreviewAction extends Action { preset: IPresetPreview };
const addPreset = (preset: IPresetPreview): IAddPresetPreviewAction => {
  return { type: ActionTypes.AddPreset, preset };
};

interface IRemovePresetPreviewAction extends Action { presetId: string };
const removePreset = (presetId: string): IRemovePresetPreviewAction => {
  return { type: ActionTypes.RemovePreset, presetId };
};

export interface IPresetPreviewOwnProps {
  preset: IPresetPreview;
  presetId: string;
};
export type IPresetPreviewAction = Action & IPresetPreviewOwnProps;
export const presetPreviews = {
  add: addPreset,
  remove: removePreset
};
