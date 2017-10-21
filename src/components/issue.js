import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './issue.css';

export default class Issue extends Component {
  static PropTypes = {
		issue: PropTypes.object
  };

	render() {
		return(
      <div className="issue col-sm-12" id={this.props.issue.id}>
        <div className="row issue-name">
          {this.props.issue.title}
        </div>
        <div className="row">
          {'#' + this.props.issue.number}
        </div>
      </div>
		)		
	}
}


Issue.propTypes = {
  issue: PropTypes.object
};














