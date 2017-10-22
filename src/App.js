import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'

import Issue from './components/issue.js'
import FilterDropdown from './components/dropdown.js'
import Switch from './components/switch.js'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      issues: [],
      assignees: [],
      fetchedLabels: [],
      formattedLabels: [],
      selectedLabels: '',
      defaultState: 'open',
      sortDropdownOptions: [
        {key: '1', value: 'newest', text: 'Newest'},
        {key: '2', value: 'oldest', text: 'Oldest'}
      ],
      sortCommentDropdownOptions: [
        {key: '1', value: 'most_commented', text: 'Most commented'},
        {key: '2', value: 'least_commented', text: 'Least commented'}
      ]
    }
    this.addFilterLabel = this.addFilterLabel.bind(this)
    this.fetchIssues = this.fetchIssues.bind(this)
    this.fetchLabels = this.fetchLabels.bind(this)
    this.fetchAssignees = this.fetchAssignees.bind(this)
    this.renderBlankSlate = this.renderBlankSlate.bind(this)
    this.selectSortOption = this.selectSortOption.bind(this)
    this.selectCommentOptions = this.selectCommentOptions.bind(this)
  }

  componentWillMount() {
    axios.get('https://api.github.com/repos/zeit/next.js/issues?page=7')
    .then((response) => {
      this.setState({issues: response.data})
    })
    .catch(function (error) {
      console.log(error);
    });

    this.fetchLabels()
    this.fetchAssignees()
  }

  fetchIssues(filters) {
    axios.get('https://api.github.com/repos/zeit/next.js/issues', {
      params: {
        labels: filters.hasOwnProperty('labels')? filters.labels : '',
        state: 'all',
        sort: filters.hasOwnProperty('sort')? filters.sort : '',
        direction: filters.hasOwnProperty('direction') ? filters.direction : ''
      }
    })
    .then((response) => {
      this.setState({issues: response.data})
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  fetchLabels() {
    let dropdownOptionObject = {
      name : "text",
      id : "value",
      url: "key"
    }
    axios.get('https://api.github.com/repos/zeit/next.js/labels')
      .then((response) => {
        this.setState({fetchedLabels: response.data}, () => this.mapLabels(dropdownOptionObject))
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  fetchAssignees() {
    axios.get('https://api.github.com/repos/zeit/next.js/assignees')
      .then((response) => {
        console.log('assignees: ' + response.data)
        this.setState({assignees: response.data})
      })
      .catch((err) => {
        console.err(err)
      })
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

  renderBlankSlate() {
    return(
      <div className="centered-text row">
        <h3 className="random-heading">
          No issues found
        </h3>
      </div>
      )
  }

  addFilterLabel(e, data) {
    let selectedLabelIDs = data.value
    let labelNames = []
    for(let i=0;i<selectedLabelIDs.length;i++) {
      this.state.fetchedLabels.find(function (fetchedLabel) { 
        labelNames[i] = fetchedLabel.name
        return fetchedLabel.id === selectedLabelIDs[i]
      })      
    }
    let labelString = labelNames.join()
    this.fetchIssues({labels: labelString})
  }

  selectSortOption(e, data) {
    if(data.value==='newest') {
      this.fetchIssues({sort: 'created', direction: 'desc'})
    } else {
      this.fetchIssues({sort: 'created', direction: 'asc'})
    }
  }

  selectCommentOptions(e, data) {
    if(data.value==='most_commented') {
      this.fetchIssues({sort: 'comments', direction: 'desc'})
    } else {
      this.fetchIssues({sort: 'comments', direction: 'asc'})
    }
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
              <FilterDropdown placeholder={'Labels'} labelOptions={this.state.formattedLabels} onChangeHandler={this.addFilterLabel} multiple />
            </div>
            <div className="col-sm-4 filter-box">
              <FilterDropdown placeholder={'Sort by date of creation'} labelOptions={this.state.sortDropdownOptions} onChangeHandler={this.selectSortOption} />
            </div>
            <div className="col-sm-4 filter-box">
              <FilterDropdown placeholder={'Sort by comments'} labelOptions={this.state.sortCommentDropdownOptions} onChangeHandler={this.selectCommentOptions} />
            </div>
          </div>
          <div className="issues col-sm-12">
            {renderIssue}
          </div>
        </div>
      </div>
    )
  }
}

export default App
