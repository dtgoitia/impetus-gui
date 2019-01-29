import { Reducer } from 'redux';
import { IPresetPreview } from 'src/components/Preset/IPresetPreview';
import { PresetPreviewFormTabs } from 'src/components/PresetExplorer/PresetPreviewForm';
import { ActionTypes } from '../actions/actionTypes';
import { IPresetPreviewAction } from '../actions/presetActions';
import { IPresetExplorerState } from '../state/IPresetExplorerState';

const presetsInitialState: IPresetExplorerState = {
  activeFormTab: PresetPreviewFormTabs.Add,
  presetPreviews: [
    {
      id: 1,
      name: 'Preset dtg',
      summary: 'Nothing to summarise',
      preset: '{"id": 2,"name":"Preset dtg","summary":"Nothing to summarise"}'
    },
    {
      id: 4,
      name: 'Preset dtg',
      summary: 'Nothing to summarise',
      preset: '{"id": 2,"name":"Preset dtg","summary":"Nothing to summarise"}'
    }
  ],
  selectedPreset: null,
};

function addPreset(state: IPresetExplorerState, action: IPresetPreviewAction): IPresetExplorerState {
  const preset: IPresetPreview = action.preset
    ? action.preset
    : {
        id: 4,
        name: 'Preset dtg',
        summary: 'Nothing to summarise',
        preset: '{"id": 2,"name":"Preset dtg","summary":"Nothing to summarise"}'
      };
  return {
    ...state,
    presetPreviews: [
      ...state.presetPreviews,
      preset
    ]
  };
};

function removePreset(state: IPresetExplorerState, action: IPresetPreviewAction): IPresetExplorerState {
  if (action.presetId === undefined) {
    throw new Error("No way to remove a preset a 'presetId' mate...");
  }
  return {...state};
};

function showAddPreset(state: IPresetExplorerState): IPresetExplorerState {
  return {
    ...state,
    activeFormTab: PresetPreviewFormTabs.Add,
  };
}

function showRemovePreset(state: IPresetExplorerState): IPresetExplorerState {
  return {
    ...state,
    activeFormTab: PresetPreviewFormTabs.Remove,
  };
}

export const presetReducer: Reducer<IPresetExplorerState, IPresetPreviewAction>
  = (state = presetsInitialState, action: IPresetPreviewAction): IPresetExplorerState => {
    switch (action.type) {
      case ActionTypes.AddPreset:
        return addPreset(state, action);
      case ActionTypes.RemovePreset:
        return removePreset(state, action);
      case ActionTypes.ShowAddPreset:
        return showAddPreset(state);
      case ActionTypes.ShowRemovePreset:
        return showRemovePreset(state);
      default:
        return state;
    };
  };
