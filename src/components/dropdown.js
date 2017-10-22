import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const FilterDropdown = ({placeholder, labelOptions, onChangeHandler}) => (
  <Dropdown
    placeholder={placeholder}
    fluid
    multiple
    selection
    options={labelOptions}
    onChange={onChangeHandler} 
  />
)

export default FilterDropdown