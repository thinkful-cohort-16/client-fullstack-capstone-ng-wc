import React from 'react';
import { connect } from 'react-redux';

import {addCloud, updateCloud, removeCloud} from '../actions';

import './generator-form.css';

export class GeneratorForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      words: [],
      title: '',
      font: 'Impact',
      color: 'Red'
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    if (target.name === 'textInput') {
      this.setState({
        text: target.value,
        words: target.value.split(/\ |\.|\?|\!|\-\(|\)|\&|\,/)
      })
    }
    else if (target.name === 'cloudTitle') {
      this.setState({
        title: target.value
      })
    }
    else if (target.name === 'fontColor') {
      this.setState({
        color: target.value
      })
    }
    else if (target.name === 'fontStyle') {
      this.setState({
        font: target.value
      })
    }
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.props.view === 'cloudEdit') {
    this.props.dispatch(updateCloud(this.props.activeCloud.id, this.state.title, this.state.text, this.state.words, this.state.font, this.state.color));
    console.log('edit');
    } 
    else {
    this.props.dispatch(addCloud( this.state.title, this.state.text, this.state.words, this.state.font, this.state.color));
    console.log('create');
    }
  }

  onDelete(event) {
    event.preventDefault();
    this.props.dispatch(removeCloud(this.props.activeCloud.id));
    console.log('delete');
  }

  render() {

    const view = this.props.view;

    let button = null;

    if (view === 'cloudEdit') {
      button =
              <div>
                <button type="submit" name="submit" id="regenerateWordCloud" className="button">
                    Regenerate Word Cloud
                </button>
                <button type="button" name="submit" id="deleteWordCloud" className="button" onClick={(e) => this.onDelete(e)}>
                    Delete Word Cloud
                </button>
              </div>
    } else {
      button =
              <div>
                <button type="submit" name="submit" id="generateWordCloudButton" className="button">
                Generate Word Cloud
                </button>
              </div>
    }

    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <div>
          <label htmlFor="textInput">please input text below</label>
        </div>
        <div>
          <textarea
          onChange={this.handleInputChange}
          name="textInput"
          id="textInput"
          className="textArea"
          defaultValue={this.props.activeCloud.text}
          required>
          </textarea>
        </div>
        <div>
          {button}
        </div>
        <div>
          <label htmlFor="cloudTitle">Title:</label>
          <input
          onChange={this.handleInputChange}
          type="text"
          name="cloudTitle"
          id="cloudTitle"
          className="text"
          defaultValue={this.props.activeCloud.title}
          required
          />
        </div>
        <div>
          <label htmlFor="fontColor">Font Color:</label>
          <select onChange={this.handleInputChange} name="fontColor" id="fontColor" size="1" defaultValue={this.props.activeCloud.color}>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
            <option value="blue">Blue</option>
          </select>
          <label htmlFor="fontStyle">Font:</label>
          <select onChange={this.handleInputChange} name="fontStyle" id="fontStyle" size="1" defaultValue={this.props.activeCloud.font}>
            <option value="Impact">Impact</option>
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
          </select>
      </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  view: state.view,
  activeCloud: state.activeCloud
});

export default connect(mapStateToProps)(GeneratorForm);