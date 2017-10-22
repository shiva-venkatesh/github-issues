import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const FilterDropdown = ({placeholder, labelOptions, onChangeHandler, onLabelClickHandler, multiple}) => (
  <Dropdown
    placeholder={placeholder}
    fluid
    multiple={multiple}
    selection
    closeOnChange={true}
    button
    options={labelOptions}
    onChange={onChangeHandler}
  />
)

export default FilterDropdown