import React from 'react';
import './DropdownItem.css'

function DropdownItem(props) {
  return (
    <a href="#" className="dropdown-item" onClick={props.onClick}>
      {props.children}
    </a>
  )
}

export default DropdownItem;