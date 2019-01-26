import * as React from 'react';
import { connect } from 'react-redux';
import { IPresetExplorerState } from 'src/redux/reducers/presetExplorer';
import { IState } from 'src/redux/state';
import { IPresetPreview } from '../Preset/IPresetPreview';

type IPresetExplorerProps = IPresetExplorerState;

interface IPresetPreviewProps {
  key: string|number;
  preset: IPresetPreview
}

const PresetPreview: React.FC<IPresetPreviewProps> = ({key, preset}) => {
  return(
    <div className={'preset-preview'} key={key}>
      <div className={'preset-name'}>{preset.name}</div>
      <div className={'preset-summary'}>{preset.summary}</div>
    </div>
  );
};

const generatetePresetList = (presets: IPresetPreview[]) => {
  return presets.map((preset: IPresetPreview, i: number): JSX.Element => {
    return <PresetPreview key={preset.id} preset={preset} />;
  });
};

const PresetExplorer: React.FC<IPresetExplorerProps> = (props: IPresetExplorerProps) => {
  if (props.presetPreviews === undefined) {
    return <div>There are not presets</div>;
  }
  const presetListElements: JSX.Element[] = generatetePresetList(props.presetPreviews);
  return(
    <div className={'sidebar'}>
      <h1>PresetExplorer</h1>
      {presetListElements}
    </div>
  );
};

function mapStateToProps(state: IState): IPresetExplorerProps {
  const { presets } = state;
  return presets;
}

export default connect(mapStateToProps)(PresetExplorer);
