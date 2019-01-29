import { Action } from 'redux';
import { IPresetPreview } from 'src/components/Preset/IPresetPreview';
import { ActionTypes } from './actionTypes';

const addPreset = (preset: IPresetPreview) => {
  return { type: ActionTypes.AddPreset, preset };
};

const showAddPreset = () => {
  return { type: ActionTypes.ShowAddPreset };
};

const showRemovePreset = () => {
  return { type: ActionTypes.ShowRemovePreset };
};

const removePreset = (presetId: string) => {
  return { type: ActionTypes.RemovePreset, presetId };
};

export interface IPresetPreviewActionPayload {
  preset: IPresetPreview;
  presetId: string;
};
export type IPresetPreviewAction = Action & IPresetPreviewActionPayload;
export const presetPreviews = {
  add: addPreset,
  showAdd: showAddPreset,
  showRemove: showRemovePreset,
  remove: removePreset
};
