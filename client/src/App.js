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
import { useApplicationData } from './hook/useApplicationData';


function App() {
  const { state, addTask } = useApplicationData();
  const [driver, setDriver] = useState([]);
  //give driver.task a defaul of [] on render
  if(!driver.task) {
    return driver.task = []
  }
  console.log(state)
  const index = state.drivers.indexOf(driver)
  console.log("this is the index", index)

  function save(description, time, location) {
    addTask(index, description, time, location);
  }

  return (
    <div className="App">
      <Navbar>
        <NavbarItem icon="Select driver">
          <Dropdown>
            {state.drivers.map(driver => {
              return <DropdownItem
                      key={driver.id}
                      onClick={() => setDriver(driver)}>
                        {driver.firstName}
                      </DropdownItem>
            })}
          </Dropdown>
        </NavbarItem>
      </Navbar>
      <AddTask onSave={save}/>
      <Calendar>
        {driver.task.map((task, index) => {
          return (
            <CalendarItem key={index} description={task.description} id={task.id} />
          )
        })}
      </Calendar>
    </div>
  );
}

export default App;
