import React from 'react';
import './Calendar.css';
import CalendarItem from './CalendarItem';


function Calendar(props) {
  if(!props) {
    return
  } else {
    return(
      <div>
        {props.children}
      </div>
    )
  }
}

export default Calendar;