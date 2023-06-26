import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './Pages/Login';
import { Home } from './Pages/Home';
import ForgetPassword from './Pages/ForgetPassword';
import ResetPassword from './Pages/ResetPassword';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log(sessionStorage.getItem("jwtToken"));
    if (sessionStorage.getItem("jwtToken")) {
      setLoggedIn(true);
    }
  }, []);

  console.log(isLoggedIn);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login setLoggedIn={setLoggedIn} />} />
        <Route path="/home" element={<Validate isLoggedIn={isLoggedIn} />} />
        <Route path="/logout" element={<HandleLogout setLoggedIn={setLoggedIn} />} />
        <Route path="/forgotpassword" element={<ForgetPassword />} /> {/* Wrap PasswordReset component inside a Route */}
        <Route path="/resetpassword" element={<ResetPassword/>} />
      </Routes>
      {/* <Navigate from="/" to="/login" /> */}
    </Router>
  );
};

function Validate({ isLoggedIn }) {
  if (isLoggedIn) {
    return <Home />;
  }
  // sessionStorage.clear("isLoggedIn")
  return <Navigate to="/login" />;
}

function HandleLogout({ setLoggedIn }) {
  console.log("logout");
  sessionStorage.removeItem("jwtToken");
  setLoggedIn(false);
  return <Navigate to="/login" />;
}

export default App;
