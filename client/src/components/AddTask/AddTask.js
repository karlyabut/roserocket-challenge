import React, { useState } from 'react';
import './AddTask.css';
import Dropdown from '../Dropdown/Dropdown';
import DropdownItem from '../Dropdown/DropdownItem';


function AddTask(props) {
  const [title, setTitle] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [startDay, setStartDay] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endDay, setEndDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('')
  const [toggleStartMonth, setToggleStartMonth] = useState(false);
  const [toggleEndMonth, setToggleEndMonth] = useState(false);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function validate() {
    if(!title || !startMonth || !startDay|| startTime === '' || !endMonth || !endDay || endTime === '' || !location) {
      alert("All fields are required. Please provide the required texts.")
    } else if(!startMonth || !endMonth || endMonth < startMonth) {
      alert("Please choose a valid start and end date.")
    } else if(!Number(startDay) || !Number(endDay)) {
      alert("Please enter a valid day.")
    } else if (endDay < startDay && endMonth <= startMonth) {
      alert("Please enter a valid day.")
    } else if(isNaN(startTime) || isNaN(endTime)) {
      alert("Please enter a valid time.")
    } else {
      props.onSave(title, startMonth, Number(startDay), Number(startTime), endMonth, Number(endDay), Number(endTime), location);
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
              onClick={() => setToggleStartMonth(!toggleStartMonth)}
              className="date-input"
              name={startMonth}
              value={!months[startMonth] ? startMonth : months[startMonth - 1]}
              type='text'
              placeholder='Choose start month'
              onChange={event => setStartMonth(event.target.value)}
            />
            {toggleStartMonth && 
                <Dropdown>
                {months.map(month => 
                  <DropdownItem
                    key={months.indexOf(month)}
                    onClick={() => {
                      setStartMonth(months.indexOf(month) + 1);
                      setToggleStartMonth(!toggleStartMonth);
                    }}>
                    {month}
                  </DropdownItem>)}
              </Dropdown>
            }
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
            <button className="create-form-button" onClick={() => setStartTime(startTime < 12 ? startTime : Number(startTime) - 12)}>AM</button>
            <button className="create-form-button" onClick={() => setStartTime(startTime < 12 ? Number(startTime) + 12 : startTime)}>PM</button>
          </div>
          <div className="enddate-container">
            <input
              onClick={() => setToggleEndMonth(!toggleEndMonth)}
              className="date-input"
              name={endMonth}
              value={!months[endMonth] ? endMonth : months[endMonth - 1]}
              type='text'
              placeholder='Choose end month'
              onChange={event => setEndMonth(event.target.value)}
            />
            {toggleEndMonth && 
                <Dropdown>
                {months.map(month => 
                  <DropdownItem
                    key={months.indexOf(month)}
                    onClick={() => {
                      setEndMonth(months.indexOf(month) + 1);
                      setToggleEndMonth(!toggleEndMonth);
                    }}>
                    {month}
                  </DropdownItem>)}
              </Dropdown>
            }
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
            <button className="create-form-button" onClick={() => setEndTime(endTime < 12 ? endTime : Number(endTime) - 12)}>AM</button>
            <button className="create-form-button" onClick={() => setEndTime(endTime < 12 ? Number(endTime) + 12 : endTime)}>PM</button>
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