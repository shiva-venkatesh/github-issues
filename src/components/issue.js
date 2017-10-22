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
        <div className="row issue-number">
          {'#' + this.props.issue.number}
        </div>
        <div className="row label-container">
          {renderLabels}
        </div>
        <div className="row issue-author">
          <span className="author-text">created by <strong><a href={this.props.issue.user.html_url}>{this.props.issue.user.login}</a></strong> </span>
          <img src={this.props.issue.user.avatar_url} className="author-img" alt={this.props.issue.user.login} />
        </div>
      </div>
		)		
	}
}

Issue.propTypes = {
  issue: PropTypes.object
};














