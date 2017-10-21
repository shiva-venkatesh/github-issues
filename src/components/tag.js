import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Tag extends Component {
  render() {
    const labelStyling = {
      color: '#ffffff',
      backgroundColor: '#' + this.props.label.color,
      fontFamily: 'PT sans',
      margin: '0 10px 10px 0',
      lineHeight: '26px',
      padding: '5px 20px 5px 23px',
      borderRadius: '15px'
    }
    return(
      <span className="tag" style={labelStyling}>
        {this.props.label.name}
      </span>
    )   
  }
}

Tag.propTypes = {
  label: PropTypes.object
};
