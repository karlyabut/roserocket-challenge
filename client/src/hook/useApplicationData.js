import { useEffect, useState } from 'react';

export function useApplicationData() {
  function GetDrivers() {
    const [drivers, setDrivers] = useState([]);
    useEffect(() => {
      fetch('/api/drivers')
      .then(res => res.json())
      .then(drivers => setDrivers(drivers))
    }, [])
    return drivers;
  }
  return { GetDrivers }
}