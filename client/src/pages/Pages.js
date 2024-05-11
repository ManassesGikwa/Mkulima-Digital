import React from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Solutions from './Solutions';
import Posts from './Posts';
import Finance from './Finance';
import Careers from './Careers';
import Community from './Community';

function Pages() {
  return (
    <div className="pages">
      <div className="page">
        <Router>
          <Switch>
          <Route path="/finance" element={<Finance />} /> 
          <Route path="/careers" element={<Careers />} /> 
          <Route path="/community" element={<Community />} /> 
            <Route path="/blogs" element={<Posts />} /> 
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/" element={<Home />} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default Pages;
