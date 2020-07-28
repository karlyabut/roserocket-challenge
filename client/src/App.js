import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Dropdown from './components/Dropdown/Dropdown';
import DropdownItem from './components/Dropdown/DropdownItem';
import Navbar from './components/Navbar/Navbar';
import NavbarItem from './components/Navbar/NavbarItem';
import Calendar from './components/Calendar/Calendar';
import CalendarItem from './components/Calendar/CalendarItem';
import AddTask from './components/AddTask/AddTask';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { 
  Scheduler, 
  WeekView, 
  Appointments, 
  Toolbar, 
  DateNavigator,
  ConfirmationDialog,
  AppointmentTooltip,
  AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { useApplicationData } from './hook/useApplicationData';


function App() {
  const { state, addTask, deleteTask } = useApplicationData();
  const [driver, setDriver] = useState([]);
  const [task, setTask] = useState([]);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [toggleCreate, setToggleCreate] = useState(false);
  //give driver.task a defaul of [] on render
  if(!driver.task) {
    return driver.task = []
  }
  // const [openNew, setOpenNew] = useState(false);
  // console.log(state)
  const index = state.drivers.indexOf(driver)
  // console.log(driver.task[0])
  // console.log("this is the index", index)
  // console.log(index, "asd")
  console.log(driver.task)

  function save(title, startMonth, startDay, startTime, endMonth, endDay, endTime, location) {
    addTask(index, title, startMonth, startDay, startTime, endMonth, endDay, endTime, location);
    setToggleCreate(!toggleCreate);
  }
  function remove({ deleted }) {
    let data = driver.task;
    let deletedObject = null;
    let deletedIndex = null;
    if(deleted !== undefined) {
      data = data.filter(b => b.id !== deleted) // returns the id of the task were trying to delete
    }
    driver.task.map(task => {
      if(task.id === deleted) { //deleted is the task id
        deletedObject = task
      }
      deletedIndex = driver.task.indexOf(deletedObject);
    })
    console.log(deletedObject)
    deleteTask(index, deletedIndex);
    console.log(driver.task)
  }
  function todaysDate() {
    let today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  }

  return (
    <div className="App">
      <Navbar>
          <a href="#" className="icon-button" onClick={() => setToggleDropdown(!toggleDropdown)}>
            Select a driver
          </a>
          {toggleDropdown && <Dropdown>
            {state.drivers.map(driver => {
              return <DropdownItem
                      key={driver.id}
                      onClick={() => {
                        setDriver(driver);
                        setToggleDropdown(!toggleDropdown)
                      }}>
                        {driver.firstName}
                      </DropdownItem>
            })}
          </Dropdown>}
      </Navbar>
      <button onClick={() => setToggleCreate(!toggleCreate)}>Create new task</button>
      { toggleCreate && <AddTask onSave={save}/>}
        <Scheduler
          data={driver.task.map((task) => task)}
          height={660}>
          <ViewState defaultCurrentDate={todaysDate()}/>
          <Toolbar/>
          <DateNavigator/>
          <WeekView startDayHour={0} endDayHour={24}></WeekView>
          <EditingState
            onCommitChanges={remove}
          />
          <IntegratedEditing/>
          <ConfirmationDialog/>
          <Appointments/>
          <AppointmentTooltip showCloseButton showOpenButton showDeleteButton/>
          <AppointmentForm/>
        </Scheduler>
    </div>
  );
}

export default App;
