import { useEffect, useState, useReducer } from 'react';
import { reducer, SET_APPLICATION_DATA } from '../reducer/application';

export function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    drivers: []
  });
  console.log(state.drivers)
  state.drivers.map(a => {
    console.log(a.id)
  })
  //API CALL
  useEffect(() => {
    fetch('/api/drivers')
    .then(res => res.json())
    .then((drivers) => {
      console.log(drivers)
      dispatch({
        type: SET_APPLICATION_DATA,
        value: drivers
      })
    })
    .catch(err => {
      console.error(err);
    })
  }, [])
  function addTask(id) {
    
  }

  return { state }
}