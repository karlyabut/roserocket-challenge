import React, { useState } from 'react';
import './Dropdown.css'
import DropdownItem from '../Dropdown/DropdownItem';

function Dropdown(props) {
  return (
    <div className="dropdown">
      {props.children}
    </div>
  )
}

export default Dropdown;