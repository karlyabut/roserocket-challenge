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
  function updateTask(index, taskIndex, title, startDate, endDate) {
    const driver = {
      ...state.drivers[index]
    }
    if(title !== undefined){
      driver.task[taskIndex].title = title;
    }
    if(startDate !== undefined) {
      driver.task[taskIndex].startDate = startDate.toISOString();
    }
    if(endDate !== undefined) {
      driver.task[taskIndex].endDate = endDate.toISOString();
    }
    console.log(driver.task[taskIndex].title)
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

  function fillCalendar(index){
    const driver = {
      ...state.drivers[index]
    }
    driver.task.push({id: generateUniqueId(), title: "Pick-up", startDate: "2020-07-26T05:00:00.000Z", endDate: "2020-07-26T06:00:00.000Z"})
    driver.task.push({id: generateUniqueId(), title: "Drop-off", startDate: "2020-07-27T07:00:00.000Z", endDate: "2020-07-27T08:00:00.000Z"})
    driver.task.push({id: generateUniqueId(), title: "Pick-up", startDate: "2020-07-28T09:00:00.000Z", endDate: "2020-07-28T10:00:00.000Z"})
    driver.task.push({id: generateUniqueId(), title: "Drop-off", startDate: "2020-07-29T11:00:00.000Z", endDate: "2020-07-29T12:00:00.000Z"})
    driver.task.push({id: generateUniqueId(), title: "Other", startDate: "2020-07-30T13:00:00.000Z", endDate: "2020-07-30T14:00:00.000Z"})
    driver.task.push({id: generateUniqueId(), title: "Coffee", startDate: "2020-07-31T15:00:00.000Z", endDate: "2020-07-31T16:00:00.000Z"})
  }

  //returns the days according to passed number i.e 2 2days
  function getDays(days) {
    let listDate = [];
    let startDate = new Date(2020, 0, 1).toISOString();
    let endDate = new Date(2020, 11, 31).toISOString();
    let dateMove = new Date(startDate);
    let strDate = startDate;
    
    while (strDate < endDate){
      strDate = dateMove.toISOString();
      listDate.push(strDate);
      dateMove.setDate(dateMove.getDate() + days);
    };
    return listDate;
  } 

  function downloadCSV(index) {
    const driver = {
      ...state.drivers[index]
    }
    let pickupNum = 0;
    let dropoffNum = 0;
    let otherNum = 0;
    let csv = 'Pick-up,Drop-off,Other\n'
    const data = []
    driver.task.map(task => {
      if(task.title === "Pick-up") {
        pickupNum += 1;
      } else if (task.title === "Drop-off") {
        dropoffNum += 1;
      } else {
        otherNum += 1;
      }
    })
    data.push([pickupNum, dropoffNum, otherNum]);
    data.forEach(row => {
      csv += row;
    });
    console.log(getDays(7));

    console.log(csv)
    // let hiddenElement = document.createElement('a');
    // hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    // hiddenElement.target = '_blank';
    // hiddenElement.download = 'task.csv';
    // hiddenElement.click();

    console.log("Pick-up", pickupNum, "Drop-off", dropoffNum, "Other", otherNum)
  }

  return { state, addTask, deleteTask, updateTask, fillCalendar, downloadCSV }
}