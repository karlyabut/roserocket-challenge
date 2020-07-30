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

    driver.task.push(
      {
        id: generateUniqueId(),
        title: title, 
        startDate: new Date(2020, startMonth - 1, startDay, startTime, 0).toISOString(), 
        endDate: new Date(2020, endMonth - 1, endDay, endTime, 0).toISOString(), 
        location: location
      })
  }
  function updateTask(index, taskIndex, title, startDate, endDate, location) {
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
    if(location !== undefined) {
      driver.task[taskIndex].location = location
    }
  }
  function deleteTask(index, taskIndex) {
    const driver = {
      ...state.drivers[index]
    }
    driver.task.splice(taskIndex, 1);
  }

  //FOR testing
  function fillCalendar(index){
    const driver = {
      ...state.drivers[index]
    }
    driver.task.push({id: generateUniqueId(), title: "Pick-up", startDate: "2020-07-26T05:00:00.000Z", endDate: "2020-07-26T06:00:00.000Z", location: "Location 1"})
    driver.task.push({id: generateUniqueId(), title: "Drop-off", startDate: "2020-07-27T07:00:00.000Z", endDate: "2020-07-27T08:00:00.000Z", location: "Location 2"})
    driver.task.push({id: generateUniqueId(), title: "Pick-up", startDate: "2020-07-28T09:00:00.000Z", endDate: "2020-07-28T10:00:00.000Z", location: "Location 3"})
    driver.task.push({id: generateUniqueId(), title: "Drop-off", startDate: "2020-07-29T11:00:00.000Z", endDate: "2020-07-29T12:00:00.000Z", location: "Location 4"})
    driver.task.push({id: generateUniqueId(), title: "Other", startDate: "2020-07-30T13:00:00.000Z", endDate: "2020-07-30T14:00:00.000Z", location: "Location 5"})
    driver.task.push({id: generateUniqueId(), title: "Coffee", startDate: "2020-07-31T15:00:00.000Z", endDate: "2020-07-31T16:00:00.000Z", location: "Location 6"})
  }

  function downloadCSV(index, timeFrame) {
    const driver = {
      ...state.drivers[index]
    }
    let csv = 'Time-Frame,Pick-up,Drop-off,Other\n'
    const data = []

    function getDays(days) {
      const listDate = [];
      let startDate = new Date(2020, 0, 1).toISOString();//Range of Janaury 1, 2020 to
      let endDate = new Date(2020, 11, 31).toISOString();// December 31, 2020
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
      dates.pop(); //remove the last lonely element
      const rangeDates = []
      while(dates.length !== 0) {
        rangeDates.push(dates.splice(0, 2))
      }
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
    for(let i = 0; i < days.length; i++) {
      days[i].push({pickUpCount: 0, dropOffCount: 0, otherCount: 0});
      for(let j = 0; j < days[i].length; j++) {
        driver.task.map(task => {
          let startDate = ''
          let lastIndex = days[i].length - 1;
          if(typeof(days[i][j]) === 'string') {
            startDate = days[i][j].split("T")[0];
          }
          if(task.title === "Pick-up" && task.startDate.split("T")[0] === startDate) {
            days[i][lastIndex].pickUpCount += 1;
          } else if (task.title === "Drop-off" && task.startDate.split("T")[0] === startDate) {
            days[i][lastIndex].dropOffCount += 1;
          } else if (task.startDate.split("T")[0] === startDate) {
            days[i][lastIndex].otherCount += 1;
          }
        })
      }
    }
    //Set up for csv columns
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
    //Set up for row
    data.forEach(row => {
      csv += row.join(',');
      csv += '\n';
    });

    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = `${driver.firstName}_${driver.lastName}_${timeFrame}_days_TimeFrame.csv`;
    hiddenElement.click();
  }

  return { state, addTask, deleteTask, updateTask, fillCalendar, downloadCSV }
}