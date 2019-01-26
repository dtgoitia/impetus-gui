import { Reducer } from 'redux';
import { IPresetPreview } from 'src/components/Preset/IPresetPreview';
import { ActionTypes } from '../actions/actionTypes';
import { IPresetPreviewAction } from '../actions/presetActions';
import { IPresetExplorerState } from '../state/IPresetExplorerState';

const presetsInitialState: IPresetExplorerState = {
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
  selectedPreset: null
};

export const presetReducer: Reducer<IPresetExplorerState, IPresetPreviewAction>
  = (state = presetsInitialState, action: IPresetPreviewAction): IPresetExplorerState => {
    switch (action.type) {
      case ActionTypes.AddPreset: {
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
      }
      default:
        return state;
    };
  };
