import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [employee, setEmployee] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  // let navigate = useNavigate();



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.2.148:8080/getdata', {
          headers: {
            Authorization: sessionStorage.getItem('jwtToken'),
            'Content-Type': 'application/json',
          },
        });
        setEmployee(response.data);
      } catch (error) {
        console.log(error.message);
        // Handle the error (e.g., display error message)
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Empty dependency array to run the effect only once
  

  return (
    <div>
      <Navbar />
      <div className="container">
        {employee && (
          <div>
            <h2>Employee Details</h2>
            <table className="table">
              <tbody>
                <tr>
                  <th>Employee ID</th>
                  <td>{employee.empId}</td>
                </tr>
                <tr>
                  <th>First Name</th>
                  <td>{employee.empFirstName}</td>
                </tr>
                <tr>
                  <th>Last Name</th>
                  <td>{employee.empLastName}</td>
                </tr>
                <tr>
                  <th>Current Time</th>
                  <td>{currentTime}</td>
                </tr>
                {/* Render other desired properties */}
              </tbody>
            </table>
          </div>
        )}
        <button className='btn btn-danger'><Link  style={{color:'black'}} to={"/logout"}>Logout</Link></button>
      </div>
    </div>
  );
};
