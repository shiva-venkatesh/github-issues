import React from 'react'
import { Radio, Segment } from 'semantic-ui-react'

const Switch = ({onChangeHandler}) => (
    <Segment compact>
      <Radio toggle onChange={onChangeHandler} />
    </Segment>
)

export default Switch