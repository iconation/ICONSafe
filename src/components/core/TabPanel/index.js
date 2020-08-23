import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        children
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

export default TabPanel
