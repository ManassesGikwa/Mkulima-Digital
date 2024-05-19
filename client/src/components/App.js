import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Solutions from '../pages/Solutions';
import Posts from './Posts';
import Finance from '../pages/Finance';
import Careers from '../pages/Careers';
import Community from "../pages/Community";
import LoginForm from "../pages/loginForm";
import SignupForm from "../pages/signupForm";
import CommunityDetails from "../pages/CommunityDetails"; 
import EditCommunity from '../pages/EditCommunity';
import AddCommunity from "../pages/AddCommunity";

function App() {
  const [registered, setRegistered] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            registered ? (
              <Navigate to="/home" />
            ) : (
              <SignupForm setRegistered={setRegistered} />
            )
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/signup"
          element={<SignupForm setRegistered={setRegistered} />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/:id" element={<CommunityDetails />} />
        <Route path="/community/:id/edit" element={<EditCommunity />} />
        <Route path="/blogs" element={<Posts />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="*" element={<Navigate to="/home" />} />
        <Route path="/community/add" element={<AddCommunity />} />
      </Routes>
    </div>
  );
}
  
export default App;