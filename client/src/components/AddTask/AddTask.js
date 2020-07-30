import React, { useState } from 'react';
import './AddTask.css';
import Dropdown from '../Dropdown/Dropdown';
import DropdownItem from '../Dropdown/DropdownItem';


function AddTask(props) {
  const [title, setTitle] = useState([props.title || '']);
  const [startMonth, setStartMonth] = useState([props.startMonth || '']);
  const [startDay, setStartDay] = useState([props.startDay || '']);
  const [endMonth, setEndMonth] = useState([props.endMonth || '']);
  const [endDay, setEndDay] = useState([props.endDay || '']);
  const [startTime, setStartTime] = useState([props.startTime || '']);
  const [endTime, setEndTime] = useState([props.endTime || '']);
  const [location, setLocation] = useState([props.location || ''])
  const [open, setOpen] = useState(false); //control drop down
  const [id, setId] = useState();

  function validateMonth(month) {
    if(month === "January" || month === "Jan") {
      return 1
    } else if (month === "February" || month === "Feb") {
      return 2
    } else if (month === "March" || month === "Mar") {
      return 3
    } else if (month === "April" || month === "Apr") {
      return 4
    } else if (month === "May" || month === "May") {
      return 5
    } else if (month === "June" || month === "Jun") {
      return 6
    } else if (month === "July" || month === "Jul") {
      return 7
    } else if (month === "August" || month === "Aug") {
      return 8
    } else if (month === "September" || month === "Sep") {
      return 9
    } else if (month === "October" || month === "Oct") {
      return 10
    } else if (month === "November" || month === "Nov") {
      return 11
    } else if (month === "December" || month === "Dec") {
      return 12
    } else {
      return ''
    }
  }
  // console.log(validateMonth(startMonth))

  function validate() {
    props.onSave(title, validateMonth(startMonth), Number(startDay), Number(startTime), validateMonth(endMonth), Number(endDay), Number(endTime), location);
    setOpen(!open)
  }
  return (
    <div className="addtask">
      <div className="addtask-form">
        <form onSubmit={event => event.preventDefault()}>
          <h4>Create a task</h4>
          <button onClick={() => setTitle('Pick-up')}>Pick-up</button>
          <button onClick={() => setTitle('Drop-off')}>Drop-off</button>
          <input
            name={title}
            value={title}
            type='text'
            placeholder='Other'
            onChange={event => setTitle(event.target.value)}
          />
          <div className="startdate">
            <input
              name={startMonth}
              value={startMonth}
              type='text'
              placeholder='Enter start month'
              onChange={event => setStartMonth(event.target.value)}
            />
            <input
              name={startDay}
              value={startDay}
              type='text'
              placeholder='Enter start day'
              onChange={event => setStartDay(event.target.value)}
            />
          </div>
          <input
            name={startTime}
            value={startTime}
            type='text'
            placeholder='Enter start time'
            onChange={event => setStartTime(event.target.value)}
          />
          <button>AM</button>
          <button>PM</button>
          <input
            name={endMonth}
            value={endMonth}
            type='text'
            placeholder='Enter end month'
            onChange={event => setEndMonth(event.target.value)}
          />
          <input
            name={endDay}
            value={endDay}
            type='text'
            placeholder='Enter end day'
            onChange={event => setEndDay(event.target.value)}
          />
          <input
            name={endTime}
            value={endTime}
            type='text'
            placeholder='Enter end time'
            onChange={event => setEndTime(event.target.value)}
          />
          <button>AM</button>
          <button>PM</button>
          <input
            name={location}
            value={location}
            type='text'
            placeholder='Enter location'
            onChange={event => setLocation(event.target.value)}
          />
          <button onClick={() => validate()}>Save</button>
        </form>
      </div>
    </div>
  )
}

export default AddTask;