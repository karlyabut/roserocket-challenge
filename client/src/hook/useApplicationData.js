import { useEffect, useState, useReducer } from 'react';
import { reducer, SET_APPLICATION_DATA } from '../reducer/application';
import axios from 'axios';

export function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    drivers: []
  });
  console.log(state.drivers)
  // state.drivers.map(a => {
  //   console.log(a.id)
  // })
  //API CALL
  useEffect(() => {
    axios.get('/api/drivers')
    .then((drivers) => {
      console.log(drivers)
      dispatch({
        type: SET_APPLICATION_DATA,
        value: drivers.data
      })
    })
    .catch(err => {
      console.error(err);
    })
  }, [])
  function addTask(id, description, time, location) {
    const driver = {
      ...state.drivers[id]
    }
    driver.task.push({id: 1, description: description, time: time, location: location})
    console.log(driver.task)
  }

  return { state, addTask }
}