import React, { useState } from 'react';
import './AddTask.css';


function AddTask(props) {
  const [description, setDescription] = useState([props.description || '']);
  const [time, setTime] = useState([props.time || '']);
  const [location, setLocation] = useState([props.location || ''])

  function validate() {
    props.onSave(description, time, location);
  }
  return (
    <div>
      <form onSubmit={event => event.preventDefault()}>
        <input
          name={description}
          value={description}
          type='text'
          placeholder='Enter description'
          onChange={event => setDescription(event.target.value)}
        />
        <input
          name={time}
          value={time}
          type='text'
          placeholder='Enter description'
          onChange={event => setTime(event.target.value)}
        />
        <input
          name={location}
          value={location}
          type='text'
          placeholder='Enter description'
          onChange={event => setLocation(event.target.value)}
        />
        <button onClick={() => validate()}>Save</button>
      </form>
    </div>
  )
}

export default AddTask;