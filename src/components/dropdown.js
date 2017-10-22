import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const FilterDropdown = ({placeholder, labelOptions}) => (
  <Dropdown placeholder={placeholder} fluid multiple selection options={labelOptions} />
)

export default FilterDropdown