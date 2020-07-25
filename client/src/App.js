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
  const { state } = useApplicationData();
  const [task, setTask] = useState([]);

  return (
    <div className="App">
      <Navbar>
        <NavbarItem icon="😀">
          <Dropdown>
            { state.drivers.map(driver => {
              return <DropdownItem
                      key={ driver.id }
                      onClick={() => setTask(driver.task)}
                      >
                        { driver.firstName }
                      </DropdownItem>
            })}
          </Dropdown>
        </NavbarItem>
      </Navbar>
      <Calendar>
        {task.map(task => {
          return (
            <h1>
              {task.id}
            </h1>
          )
        })}
      </Calendar>
    </div>
  );
}

export default App;
