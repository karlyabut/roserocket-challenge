import React from 'react';
import './Calendar.css';
import CalendarItem from './CalendarItem';


function Calendar(props) {
  return(
    <div>
      {props.children}
    </div>
  )
}

export default Calendar;