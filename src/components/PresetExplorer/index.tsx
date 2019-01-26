import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from 'src/redux/state';

interface IPresetExplorerProps {
  [x: string]: any;
}

const PresetExplorer: React.SFC<IPresetExplorerProps> = (props) => {
  return(
    <div>
      <h1>PresetExplorer</h1>
      <p>{JSON.stringify(props)}</p>
    </div>
  );
};

function mapStateToProps(state: IState): IPresetExplorerProps {
  const { presets }: IState = state;
  return presets;
}

export default connect(mapStateToProps)(PresetExplorer);
