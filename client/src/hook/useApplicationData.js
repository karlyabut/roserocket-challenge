import { useEffect, useState, useReducer } from 'react';
import { reducer, SET_APPLICATION_DATA } from '../reducer/application';
import axios from 'axios';

export function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    drivers: []
  });
  // console.log(state.drivers)
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
  function generateUniqueId() {
    const arr = [];
    while(arr.length < 3) {
      let r = Math.floor(Math.random() * 100) + 1;
      if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr.join('')
  }
  function addTask(index, title, startMonth, startDay, startTime, endMonth, endDay, endTime, location) {
    const driver = {
      ...state.drivers[index]
    }
    console.log("passing what",startMonth, startDay, startTime, endMonth, endDay, endTime)
    driver.task.push(
      {
        id: generateUniqueId(),
        title: title, 
        startDate: new Date(2020, startMonth - 1, startDay, startTime, 0).toISOString(), 
        endDate: new Date(2020, endMonth - 1, endDay, endTime, 0).toISOString(), 
      })
  }
  function deleteTask(index, taskIndex) {
    const driver = {
      ...state.drivers[index]
    }
    console.log(index);
    console.log(driver.task);
    driver.task.splice(taskIndex, 1);
    // console.log(driver);
  }

  return { state, addTask, deleteTask }
}