import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { presetPreviews } from 'src/redux/actions/presetActions';
import { IState } from 'src/redux/state';
import { IPresetExplorerState } from 'src/redux/state/IPresetExplorerState';
import { Button } from '../common/Button';
import { IPresetPreview } from '../Preset/IPresetPreview';
import { PresetPreview } from './PresetPreview';
import PresetPreviewForm from './PresetPreviewForm';

type IPresetExplorerProps = IPresetExplorerState | any;

const generatetePresetList = (presets: IPresetPreview[]): JSX.Element[] => {
  if (presets === undefined) {
    return [<div key={0}>There are not presets</div>];
  }
  return presets.map((preset: IPresetPreview): JSX.Element => {
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
          <Button text="ADD" callback={props.onShowAdd}/>
          <Button text="REMOVE" callback={props.onShowRemove}/>
        </div>
        <PresetPreviewForm />
      </div>
    );
  };

function mapStateToProps(state: IState): IPresetExplorerState {
  const { presets } = state;
  return presets;
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>)  {
  return {
    onAdd: (presetPreview: IPresetPreview) =>
      dispatch(presetPreviews.add(presetPreview)),
    onShowAdd: () =>
      dispatch(presetPreviews.showAdd()),
    onShowRemove: () =>
      dispatch(presetPreviews.showRemove()),
    onRemove: (presetId: string) =>
      dispatch(presetPreviews.remove(presetId)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PresetExplorer);
