import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'

import Issue from './components/issue.js'
import FilterDropdown from './components/dropdown.js'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      issues: [],
      fetchedLabels: [],
      formattedLabels: []
    }
  }

  componentWillMount() {
    let dropdownOptionObject = {
      name : "text",
      id : "key",
      color: "value"
    }

    axios.get('https://api.github.com/repos/zeit/next.js/issues?page=7')
    .then((response) => {
      this.setState({issues: response.data})
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get('https://api.github.com/repos/zeit/next.js/labels')
    .then((response) => {
      this.setState({fetchedLabels: response.data}, () => this.mapLabels(dropdownOptionObject))
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  mapLabels(dropdownOptionObject) {
    let newLabelObject = {}
    let formattedLabels = []
    this.state.fetchedLabels.map((label, index) => {
      return(
         newLabelObject = _.mapKeys(label, function(value, key) {
            return dropdownOptionObject[key];
          }),
         formattedLabels[index] = newLabelObject
        )
    })
    this.setState({formattedLabels: formattedLabels})
  }

  render() {
    const renderIssue = this.state.issues.map((issue) => {
      return(
          <Issue issue={issue} key={issue.id} />
        )
    })

    return (
      <div className="App">
        <div className="container app-body">
          <h3 className="repo-name col-sm-12">Current Repository : Next.js</h3>
          <div className="col-sm-12 filters">
          <div className="col-sm-4 filter-box">
            <FilterDropdown placeholder={'Labels'} labelOptions={this.state.formattedLabels} />
          </div>
          </div>
          <div className="issues col-sm-12">
            {renderIssue}
          </div>
        </div>
      </div>
    );
  }
}

export default App
