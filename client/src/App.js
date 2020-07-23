import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Dropdown from './components/Dropdown/Dropdown';
import Navbar from './components/Navbar/Navbar';
import NavbarItem from './components/Navbar/NavbarItem';


function App() {
  const [drivers, setDrivers] = useState([]);
  useEffect(() => {
    fetch('/api/drivers')
    .then(res => res.json())
    .then(drivers => setDrivers(drivers))
  }, [])
  
  return (
    <div className="App">
      <Navbar>
        <NavbarItem icon="😀">
          <Dropdown items={drivers}/>
 
        </NavbarItem>
      </Navbar>
    </div>
  );
}

export default App;
