import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './issue.css';

import Tag from './tag.js' 

export default class Issue extends Component {
  static PropTypes = {
		issue: PropTypes.object
  };

	render() {
    const renderLabels = this.props.issue.labels.map(label => {
      return(
          <Tag label={label} key={label.id} />
        )
    })
		return(
      <div className="issue col-sm-12" id={this.props.issue.id}>
        <div className="row issue-name">
          {this.props.issue.title}
        </div>
        <div className="row">
          {'#' + this.props.issue.number}
        </div>
        <div className="row label-container">
          {renderLabels}
        </div>
      </div>
		)		
	}
}

Issue.propTypes = {
  issue: PropTypes.object
};














