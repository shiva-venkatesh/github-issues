import React, { Component } from 'react'
import axios from 'axios'

import Issue from './components/issue.js'
import Dropdown from './components/dropdown.js'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      issues: [],
      labels: []
    }
  }

  componentWillMount() {
    axios.get('https://api.github.com/repos/zeit/next.js/issues?page=7')
    .then((response) => {
      this.setState({issues: response.data})
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get('https://api.github.com/repos/zeit/next.js/labels')
    .then((response) => {
      this.setState({labels: response.data})
    })
    .catch(function (error) {
      console.log(error);
    });
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
          <div className="col-sm-3">
            <Dropdown />
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
