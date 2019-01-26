import * as React from 'react';
import { IPresetPreview } from '../Preset/IPresetPreview';

interface IPresetPreviewProps {
  key: string|number;
  preset: IPresetPreview
}

export const PresetPreview: React.FC<IPresetPreviewProps> = ({key, preset}) => {
  return (
    <div className={'preset-preview'} key={key}>
      <div className={'preset-name'}>{preset.name}</div>
      <div className={'preset-summary'}>{preset.summary}</div>
    </div>
  );
};
