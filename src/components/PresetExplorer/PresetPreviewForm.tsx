import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { presetPreviews } from 'src/redux/actions/presetActions';
import { IState } from 'src/redux/state';
import { IPresetPreview } from '../Preset/IPresetPreview';

import './PresetPreviewForm.css';

interface IPresetPreviewFormState {
  activeTab: PresetPreviewFormTabs;
  id: string;
  name: string;
  summary: string;
};

interface IPresetPreviewFormProps {
  submitAdd: (preset: IPresetPreview) => void;
  submitRemove: (presetId: string) => void;  // TODO
  [x: string]: any;
};

export enum PresetPreviewFormTabs {
  None = 0,
  Add = 1,
  Remove = 2,
}

class PresetPreviewForm extends React.Component<IPresetPreviewFormProps, IPresetPreviewFormState> {
  constructor(props: IPresetPreviewFormProps) {
    super(props);
    this.state = {
      activeTab: this.props.activeTab ? this.props.activeTab : PresetPreviewFormTabs.None,
      id: '',
      name: '',
      summary: '',
    }

    this.onNameChange = this.onNameChange.bind(this);
    this.onSummaryChange = this.onSummaryChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public onIdChange(event: React.FormEvent<HTMLInputElement>): void {
    this.setState({ id: event.currentTarget.value });
  }
  public onNameChange(event: React.FormEvent<HTMLInputElement>): void {
    this.setState({ name: event.currentTarget.value });
  }
  public onSummaryChange(event: React.FormEvent<HTMLInputElement>): void {
    this.setState({ summary: event.currentTarget.value });
  }

  public onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    switch (this.state.activeTab) {
      case PresetPreviewFormTabs.Add:
        this.props.submitAdd({
          id: 1234,  // TODO: ensure no ID duplication
          name: this.state.name,
          preset: 'preset',
          summary: this.state.summary,
        });
        break;
      case PresetPreviewFormTabs.Remove:
        if (this.state.id === undefined || this.state.id === null) {
          alert('The ID cannot be undefined or null');
          break;
        }
        this.props.submitRemove(this.state.id);
        break;
    }
    event.preventDefault();
  }

  public render(): JSX.Element {
    switch (this.state.activeTab) {
      case PresetPreviewFormTabs.Add:
        return (
          <form className={'preset-preview-form'} onSubmit={this.onSubmit}>

            <p>ADD PRESET</p>
            <p>
              <label htmlFor="preset-name">Name: </label>
              <input type="text" id="preset-name"
                value={this.state.name} onChange={this.onNameChange} />
            </p>

            <p>
              <label htmlFor="preset-summary">Summary:</label>
              <input type="text" id="preset-summary"
                value={this.state.summary} onChange={this.onSummaryChange} />
            </p>

            <input type="submit" value="Submit" />
          </form>
        );
      case PresetPreviewFormTabs.Remove:
        return (
          <form className={'preset-preview-form'} onSubmit={this.onSubmit}>
            <p>REMOVE PRESET</p>

            <p>
              <label htmlFor="preset-id">ID: </label>
              <input type="text" id="preset-id"
                value={this.state.id} onChange={this.onNameChange} />
            </p>

            <input type="submit" value="Submit" />
          </form>
        );

      default:
        return <div>(no tab)</div>;
    }
  }
}

function mapStateToProps(state: IState) {
  const { presets } = state;
  return { activeTab: presets.activeFormTab };    // TODO: fix this mess
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
)(PresetPreviewForm);
