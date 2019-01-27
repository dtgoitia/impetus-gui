import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { presetPreviews, IPresetPreviewOwnProps } from 'src/redux/actions/presetActions';
import { IState } from 'src/redux/state';
import { IPresetExplorerState } from 'src/redux/state/IPresetExplorerState';
import { Button } from '../common/Button';
import { IPresetPreview } from '../Preset/IPresetPreview';
import { PresetPreview } from './PresetPreview';

type IPresetExplorerProps = IPresetExplorerState | any;

const generatetePresetList = (presets: IPresetPreview[]): JSX.Element[] => {
  if (presets === undefined) {
    return [<div key={0}>There are not presets</div>];
  }
  return presets.map((preset: IPresetPreview, i: number): JSX.Element => {
    return <PresetPreview key={preset.id} preset={preset} />;
  });
};

// tslint:disable:jsx-no-lambda
const PresetExplorer: React.FC<IPresetExplorerProps>
  = (props: IPresetExplorerProps) => {

    return (
      <div className={'sidebar'}>
        <h1>PresetExplorer</h1>
        {generatetePresetList(props.presetPreviews)}
        <div className={'footer'}>
          <Button text="ADD" callback={props.addPreset}/>
          <Button text="REMOVE" />
        </div>
      </div>
    );
  };

function mapStateToProps(state: IState): IPresetExplorerState {
  const { presets } = state;
  return presets;
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>, ownProps: IPresetPreviewOwnProps) {
  return {
    onAddP: () => dispatch(presetPreviews.add(ownProps.preset)),
    onRemove: () => dispatch(presetPreviews.remove(ownProps.presetId))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PresetExplorer);
