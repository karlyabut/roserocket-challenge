import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Dropdown from './components/Dropdown/Dropdown';
import DropdownItem from './components/Dropdown/DropdownItem';
import Navbar from './components/Navbar/Navbar';
import NavbarItem from './components/Navbar/NavbarItem';
import Calendar from './components/Calendar/Calendar';
import CalendarItem from './components/Calendar/CalendarItem';
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

  return (
    <div className="App">
      <Navbar>
        <NavbarItem icon="😀">
          <Dropdown>
            { state.drivers.map(driver => {
              return <DropdownItem
                      key={ driver.id }
                      onClick={() => setDriver(driver)}
                      >
                        { driver.firstName }
                      </DropdownItem>
            })}
          </Dropdown>
        </NavbarItem>
      </Navbar>
      <button onClick={() => addTask(index) }>click me</button>
      <Calendar>
        {driver.task.map(task => {
          return (
            <CalendarItem name={ task.description } id={ task.id } />
          )
        })}
      </Calendar>
    </div>
  );
}

export default App;
