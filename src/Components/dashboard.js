import React, { useEffect, useState } from 'react';
import classes from "./dashBoard.module.css"
import { json } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState("");
  const [firstName, setFirstName] = useState("");
  const [Lastname, setLastname] = useState("");
  const [number,setNumber] = useState('')


  useEffect(() => {
    // Retrieve data from localStorage
    const storedEmail = localStorage.getItem('enteredEmail');
    const firstNames = localStorage.getItem('enteredFirstname')
    const Lastnames = localStorage.getItem('enteredLastname')
    const MobileNum = localStorage.getItem('enteredMobile')
    if (storedEmail) {
      setUserData(JSON.parse(storedEmail));
    }
    if(firstNames){
      setFirstName(firstNames);
    }
    if(Lastnames){
      setLastname(Lastnames);

    }
    if(MobileNum){
      setNumber(MobileNum);
    }
  }, []);
  console.log(userData)
  console.log(userData.email)

  return (
    <div className={classes['user-details']}>
      <h1>Dashboard</h1>
      <span className={classes.name}>Name: {firstName}</span>
      <span className={classes.email}>Email: {userData}</span>
      <span className={classes.mobile}>Number: {number}</span>
    </div>
  );
};

export default Dashboard;
