import { Action, AnyAction, Reducer } from 'redux';
import { IPreset } from 'src/components/Preset/IPreset';
import { IPresetPreview } from 'src/components/Preset/IPresetPreview';

export interface IPresetExplorerState {
  presetPreviews: IPresetPreview[];    // preset preview, this list was reduced from preset list (with full details)
  selectedPreset: null|number;  // select the preset by ID, or null if none selected
  presets?: IPreset[]; // this holds all the data of all the presets
}

interface IPresetAction extends Action {
  payload: any;
}

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

export const presetReducer: Reducer<IPresetExplorerState, AnyAction>
  = (state = presetsInitialState, action: IPresetAction): IPresetExplorerState => {
  return state;
  // TODO: add a switch to modify the state with the different reducers based on the action
};
