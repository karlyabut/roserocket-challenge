import React, { useState } from 'react';
import './Dropdown.css'
import DropdownItem from '../Dropdown/DropdownItem';

function Dropdown({title, items}) {
  return (
    <div className="dropdown">
      {items.map(driver => {
        return <DropdownItem key={ driver.id } onClick={ () => console.log("id", driver.task )}>{ driver.firstName }</DropdownItem>
      })}
    </div>
  )
}

export default Dropdown;