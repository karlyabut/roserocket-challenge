import { useEffect, useState, useReducer } from 'react';
import { reducer, SET_APPLICATION_DATA } from '../reducer/application';
import axios from 'axios';

export function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    drivers: []
  });
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

  function downloadCSV(index, timeFrame) {
    const driver = {
      ...state.drivers[index]
    }
    let pickupNum = 0;
    let dropoffNum = 0;
    let otherNum = 0;
    let csv = 'Time-Frame,Pick-up,Drop-off,Other\n'
    const data = []
    const test = [];

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
  
    function getSeriesOfDates() {
      const dates = [];
      const seriesOfDates = getDays(timeFrame);
      dates.push(seriesOfDates[0])
      seriesOfDates.reduce((prev, curr) => {
        dates.push(curr, curr)
      })
      dates.pop();
      const rangeDates = []
      while(dates.length !== 0) {
        rangeDates.push(dates.splice(0, 2))
      }
      console.log(rangeDates);
      return rangeDates;
    }
  
    function getFinalDates() {
      const rangeDates = getSeriesOfDates()
      const finalDates = []
      rangeDates.map(dates => {
        let startDate = new Date(dates[0]);
        let endDate = new Date(dates[1]);
        startDate = startDate.setDate(startDate.getDate() + 1)
        while(dates.length !== timeFrame + 1) {
          endDate = new Date(endDate.setDate(endDate.getDate() - 1));
          dates.splice(1, 0, endDate.toISOString());
        }
        finalDates.push(dates)
      })
      return finalDates;
    }

    const days = getFinalDates();
    console.log(days[0])
    for(let i = 0; i < days.length; i++) {
      days[i].push({pickUpCount: 0, dropOffCount: 0, otherCount: 0});
      for(let j = 0; j < days[i].length; j++) {
        driver.task.map(task => {
          let startDate = ''
          let lastIndex = days[i].length - 1;
          if(typeof(days[i][j]) === 'string') {
            startDate = days[i][j].split("T")[0];
            console.log(startDate)
          }
          if(task.title === "Pick-up" && task.startDate.split("T")[0] === startDate) {
            pickupNum += 1;
            days[i][lastIndex].pickUpCount += 1;
          } else if (task.title === "Drop-off" && task.startDate.split("T")[0] === startDate) {
            dropoffNum += 1;
            days[i][lastIndex].dropOffCount += 1;
          } else if (task.startDate.split("T")[0] === startDate) {
            otherNum += 1;
            days[i][lastIndex].otherCount += 1;
          }
        })
      }
    }
    days.map(day => {
      const displayMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      let firstDay = new Date(day[0])
      firstDay = displayMonths[(firstDay.getMonth() + 1) - 1] + "-" + firstDay.getDate();
      let lastDay = new Date(day[day.length - 2]);
      lastDay = displayMonths[(lastDay.getMonth() + 1) - 1] + "-" + lastDay.getDate()
      data.push([
        [`${firstDay} to ${lastDay}`, day[day.length - 1].pickUpCount, day[day.length - 1].dropOffCount, day[day.length - 1].otherCount]
      ])
    })

    data.forEach(row => {
      csv += row.join(',');
      csv += '\n';
    });
    console.log(csv)
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'task.csv';
    hiddenElement.click();

    console.log("Pick-up", pickupNum, "Drop-off", dropoffNum, "Other", otherNum)
  }

  return { state, addTask, deleteTask, updateTask, fillCalendar, downloadCSV }
}