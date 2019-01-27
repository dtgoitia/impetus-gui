// import { IPreset } from 'src/components/Preset/IPreset';
import { IPresetPreview } from 'src/components/Preset/IPresetPreview';

export interface IPresetExplorerState {
  readonly presetPreviews: IPresetPreview[];
  readonly selectedPreset: null|number;  // select the preset by ID, or null if none selected
  // readonly presets: IPreset[]; // complete data of presets
}
