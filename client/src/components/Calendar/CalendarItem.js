import React from 'react';

function CalendarItem(props) {
  return (
    <div>
      <h1>{props.description}</h1>
      <h1>{props.id}</h1>
      <button onClick={props.onClick}>Confirm</button>
    </div>
  )
}

export default CalendarItem;