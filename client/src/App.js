import React, { useState } from 'react';
import './App.css';
import Dropdown from './components/Dropdown/Dropdown';
import DropdownItem from './components/Dropdown/DropdownItem';
import Navbar from './components/Navbar/Navbar';
import Grid from '@material-ui/core/Grid';
import Room from '@material-ui/icons/Room';

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
  const { state, addTask, deleteTask, updateTask, fillCalendar, downloadCSV } = useApplicationData();
  const [driver, setDriver] = useState([]);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [toggleCreateBtn, setToggleCreateBtn] = useState(false);
  const [toggleCreate, setToggleCreate] = useState(false);
  const [toggleDownload, setToggleDownload] = useState(false);
  const [toggleDownloadButton, setToggleDownloadButton] = useState(false);
  const [refreshTask, setRefreshTask] = useState(false); //just a hack to render the added/udated and deleted task :(
  //give driver.task a defaul of [] on render
  if(!driver.task) {
    return driver.task = []
  }
  const index = state.drivers.indexOf(driver)

  function save(title, startMonth, startDay, startTime, endMonth, endDay, endTime, location) {
    addTask(index, title, startMonth, startDay, startTime, endMonth, endDay, endTime, location);
    setToggleCreate(!toggleCreate);
  }
  function closeForm() {
    setToggleCreate(false);
  }
  function updateAndDelete({ changed, deleted }) {
    let data = driver.task;
    let deletedObject = null;
    let deletedIndex = null;

    let changeObject = null;
    let changeIndex = null;

    if(changed) {
      console.log("here", changed)
      const changedId = Object.keys(changed).join('')
      console.log(Object.keys(changed).join(''))
      data = data.map(c => {
        if(c.id === changedId) {
          changeObject = c
        }
        return changeIndex = driver.task.indexOf(changeObject);
      })
      console.log("index", changeIndex)
      console.log(changeObject);
      updateTask(index, changeIndex, changed[changedId].title, changed[changedId].startDate, changed[changedId].endDate, changed[changedId].location);
    }

    if(deleted !== undefined) {
      data = data.filter(b => b.id !== deleted) // returns the id of the task were trying to delete
      driver.task.map(task => {
        if(task.id === deleted) { //deleted is the task id
          deletedObject = task
        }
        return deletedIndex = driver.task.indexOf(deletedObject);
      })
      deleteTask(index, deletedIndex);
    }
    setRefreshTask(!refreshTask)
  }
  function fill() {
    fillCalendar(index)
    setRefreshTask(!refreshTask)
    console.log(driver.task)
  }
  function todaysDate() {
    let today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  }
  
  // FOR CONTENT AND EDITING PURPOSES USING THE TOOLTIP (each appointment onClick())
  const Content = (({
      appointmentData, ...restProps
    }) => (
      <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <Room />
          </Grid>
          <Grid item xs={10}>
            <span>{appointmentData.location}</span>
          </Grid>
        </Grid>
      </AppointmentTooltip.Content>
  ));
  const messages = {
    moreInformationLabel: '',
  };

  const TextEditor = (props) => {
    if (props.type === 'multilineTextEditor') {
      return null;
    } return <AppointmentForm.TextEditor {...props} />;
  };

  const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    const onCustomFieldChange = (newLocation) => {
      onFieldChange({ location: newLocation });
      console.log(newLocation)
    };
    return (
      <AppointmentForm.BasicLayout
        appointmentData={appointmentData}
        onFieldChange={onFieldChange}
        {...restProps}
      >
        <AppointmentForm.Label
          text="Location"
          type="title"
        />
        <AppointmentForm.TextEditor
          value={appointmentData.location}
          onValueChange={onCustomFieldChange}
          placeholder={appointmentData.location}
        />
      </AppointmentForm.BasicLayout>
    );
  };
  /**********************************************************************************/

  return (
    <div className="App">
      {refreshTask}
      <Navbar>
        <div className="driver-container">
          <button className="driver-button" onClick={() => setToggleDropdown(!toggleDropdown)}>Select a driver</button>
        </div>
        <div className="driver-dropdown">
          {toggleDropdown && <Dropdown>
            {state.drivers.map(driver => {
              return <DropdownItem
                      key={driver.id}
                      onClick={() => {
                        setDriver(driver);
                        setToggleDropdown(!toggleDropdown);
                        setToggleDownloadButton(true);
                        setToggleCreateBtn(true);
                      }}>
                        {driver.firstName} {driver.lastName}
                      </DropdownItem>
            })}
          </Dropdown>}
        </div>
          <div className="download-container">
            {toggleDownloadButton && 
            <button className="download-button" 
              onClick={() => setToggleDownload(!toggleDownload)}>
                Download Schedule
              </button>}
          </div>
          <div className="download-dropdown">
            {toggleDownload && <Dropdown>
              <DropdownItem onClick={() =>{
                setToggleDownload(!toggleDownload);
                downloadCSV(index, 2);
              }}>By 2 days</DropdownItem>
              <DropdownItem onClick={() =>{
                setToggleDownload(!toggleDownload);
                downloadCSV(index, 4);
              }}>By 4 days</DropdownItem>
              <DropdownItem onClick={() =>{
                setToggleDownload(!toggleDownload);
                downloadCSV(index, 7)
              }}>By 7 days</DropdownItem>
              <DropdownItem onClick={() =>{
                setToggleDownload(!toggleDownload);
                downloadCSV(index, 14)
              }}>By 14 days</DropdownItem>
              <DropdownItem onClick={() =>{
                setToggleDownload(!toggleDownload);
                downloadCSV(index, 28)
              }}>By 28 days</DropdownItem>
            </Dropdown>}
          </div>
          <div className="driver-name-container">
            <span className="driver-name">{driver.firstName} {driver.lastName}</span>
          </div>
      </Navbar>
      {toggleCreateBtn && 
      <div className="create-button-container">
        <button className="create-button" onClick={() => setToggleCreate(!toggleCreate)}>Create new task</button>
        <button onClick={fill}>Fill Aug 26 - 31 with test data</button>
      </div>}
      { toggleCreate && <AddTask onSave={save} onClose={closeForm}/>}
      <div className="schedule-container">
        <Scheduler
          data={driver.task.map((task) => task)}
          height={850}>
          <ViewState defaultCurrentDate={todaysDate()}/>
          <Toolbar/>
          <DateNavigator/>
          <WeekView startDayHour={0} endDayHour={24}></WeekView>
          <EditingState
            onCommitChanges={updateAndDelete}
          />
          <IntegratedEditing/>
          <ConfirmationDialog/>
          <Appointments/>
          <AppointmentTooltip 
            contentComponent={Content}
            showCloseButton 
            showOpenButton 
            showDeleteButton/>
          <AppointmentForm
            basicLayoutComponent={BasicLayout}
            textEditorComponent={TextEditor}
            messages={messages}/>
        </Scheduler>
      </div>
    </div>
  );
}

export default App;
