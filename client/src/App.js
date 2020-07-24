import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dropdown from './components/Dropdown/Dropdown';
import Navbar from './components/Navbar/Navbar';
import NavbarItem from './components/Navbar/NavbarItem';
import { useApplicationData } from './hook/useApplicationData';


function App() {
  const { GetDrivers } = useApplicationData();
  
  return (
    <div className="App">
      <Navbar>
        <NavbarItem icon="😀">
          <Dropdown items={ GetDrivers() }/>
 
        </NavbarItem>
      </Navbar>
    </div>
  );
}

export default App;
