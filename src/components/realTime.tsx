"use client";
import { useEffect, useState } from 'react';


export default function RealTimeComponent(){

    const [today, setDate] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
      const timer = setInterval(() => { // Creates an interval which will update the current data every minute

      // This will trigger a rerender every component that uses the useDate hook.
      setDate(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    }
  }, []);

    return (
        <span>{today}</span>
    )
}
