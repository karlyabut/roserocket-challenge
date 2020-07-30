import React, { useState } from 'react';
import './AddTask.css';


function AddTask(props) {
  const [title, setTitle] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [startDay, setStartDay] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endDay, setEndDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('')

  function validateMonth(monthString) {
    let month = monthString.toLowerCase().trim();
    if(month === "january" || month === "jan") {
      return 1
    } else if (month === "february" || month === "feb") {
      return 2
    } else if (month === "march" || month === "mar") {
      return 3
    } else if (month === "april" || month === "apr") {
      return 4
    } else if (month === "may" || month === "may") {
      return 5
    } else if (month === "june" || month === "jun") {
      return 6
    } else if (month === "july" || month === "jul") {
      return 7
    } else if (month === "august" || month === "aug") {
      return 8
    } else if (month === "september" || month === "sep") {
      return 9
    } else if (month === "october" || month === "oct") {
      return 10
    } else if (month === "november" || month === "nov") {
      return 11
    } else if (month === "december" || month === "dec") {
      return 12
    } else {
      return 0;
    }
  }

  function validate() {
    if(!title || !startMonth || !startDay|| !startTime|| !endMonth || !endDay || !endTime || !location) {
      alert("All fields are required. Please provide the required texts.")
    } else if(validateMonth(startMonth) === 0 || validateMonth(endMonth) === 0) {
      alert("Please enter a valid date. I.E. Jan/January, Feb/February, etc...")
    } else if(!Number(startDay) || !Number(endDay)) {
      alert("Please enter a valid day.")
    } else if(!Number(startTime) || !Number(endTime)) {
      alert("Please enter a valid time.")
    } else {
      props.onSave(title, validateMonth(startMonth), Number(startDay), Number(startTime), validateMonth(endMonth), Number(endDay), Number(endTime), location);
    }
  }
  return (
    <div className="addtask">
      <div className="addtask-form">
        <form onSubmit={event => event.preventDefault()}>
          <h3 className="create-label">Create a task</h3>
          <div className="description-container">
            <button className="create-form-button" onClick={() => setTitle('Pick-up')}>Pick-up</button>
            <button className="create-form-button" onClick={() => setTitle('Drop-off')}>Drop-off</button>
            <input
              className="title-input"
              name={title}
              value={title}
              type='text'
              placeholder='Other'
              onChange={event => setTitle(event.target.value)}
            />
          </div>
          <div className="startdate-container">
            <input
              className="date-input"
              name={startMonth}
              value={startMonth}
              type='text'
              placeholder='Enter start month'
              onChange={event => setStartMonth(event.target.value)}
            />
            <input
              className="date-input"
              name={startDay}
              value={startDay}
              type='text'
              placeholder='Enter start day'
              onChange={event => setStartDay(event.target.value)}
            />
            <input
              className="time-input"
              name={startTime}
              value={startTime}
              type='text'
              placeholder='Time'
              onChange={event => setStartTime(event.target.value)}
            />
            <button className="create-form-button" onClick={() => setStartTime(startTime <= 12 ? startTime : Number(startTime) - 12)}>AM</button>
            <button className="create-form-button" onClick={() => setStartTime(startTime <= 12 ? Number(startTime) + 12 : startTime)}>PM</button>
          </div>
          <div className="enddate-container">
            <input
              className="date-input"
              name={endMonth}
              value={endMonth}
              type='text'
              placeholder='Enter end month'
              onChange={event => setEndMonth(event.target.value)}
            />
            <input
              className="date-input"
              name={endDay}
              value={endDay}
              type='text'
              placeholder='Enter end day'
              onChange={event => setEndDay(event.target.value)}
            />
            <input
              className="time-input"
              name={endTime}
              value={endTime}
              type='text'
              placeholder='Time'
              onChange={event => setEndTime(event.target.value)}
            />
            <button className="create-form-button" onClick={() => setEndTime(endTime <= 12 ? endTime : Number(endTime) - 12)}>AM</button>
            <button className="create-form-button" onClick={() => setEndTime(endTime <= 12 ? Number(endTime) + 12 : endTime)}>PM</button>
          </div>
          <div className="location-container">
            <input
              className="location-input"
              name={location}
              value={location}
              type='text'
              placeholder='Enter location'
              onChange={event => setLocation(event.target.value)}
            />
          </div>
          <button className="create-form-button" onClick={() => validate()}>Save</button>
          <button className="close-form-button" onClick={props.onClose}>Close</button>
        </form>
      </div>
    </div>
  )
}

export default AddTask;