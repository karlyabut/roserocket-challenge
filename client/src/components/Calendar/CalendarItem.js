import React from 'react';

function CalendarItem(props) {
  return (
    <div>
      <h1>{ props.name }</h1>
      <h1>{ props.id }</h1>
    </div>
  )
}

export default CalendarItem;