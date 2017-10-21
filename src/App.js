import React, { Component } from 'react'
import axios from 'axios'

import Issue from './components/issue.js'

import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      issues: []
    }
  }

  componentWillMount() {
    axios.get('https://api.github.com/repos/zeit/next.js/issues')
    .then((response) => {
      console.log(response.data);
      this.setState({issues: response.data})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const renderIssue = this.state.issues.map((issue) => {
      return(
          <Issue issue={issue} />
        )
    })

    return (
      <div className="App">
        <div className="container">
          <h3 className="repo-name col-sm-12">Next.js</h3>
          <div className="issues col-sm-12">
            {renderIssue}
          </div>
        </div>
      </div>
    );
  }
}

export default App
