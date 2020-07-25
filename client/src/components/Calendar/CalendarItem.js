import React from 'react';

function CalendarItem(props) {
  return (
    <a href="#" onClick={ props.onClick }>
      { props.children }
    </a>
  )
}

export default CalendarItem;