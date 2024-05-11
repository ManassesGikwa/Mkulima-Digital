// import React from "react";

// import NavBar from "./NavBar";
// import Footer from "./Footer";

// function App(){
//   return(
//   <div className="main">
//     <NavBar/>
    
//     <Footer />
//   </div>
//   )
// }

// export default App
import React from 'react';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';

import Home from '../pages/Home';
import Solutions from '../pages/Solutions';
import Posts from './Posts';
import Finance from '../pages/Finance';
import Careers from '../pages/Careers';
import Community from "../pages/Community";
import LoginForm from "../pages/loginForm"
import SignupForm from "../pages/signupForm"

function Pages() {
  const [registered, setRegistered] = React.useState(false);
  return (
    <div className="pages">
      <div className="page">
        <Router>
          <Switch>
          <Route exact path="/">
            {registered ? (
              <Redirect to="/home" />
            ) : (
              <SignupForm setRegistered={setRegistered} />
            )}
          </Route>
          <Route path="/finance" element={<Finance />} /> 
          <Route path="/careers" element={<Careers />} /> 
          <Route path="/community" element={<Community />} /> 
            <Route path="/blogs" element={<Posts />} /> 
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/" element={<Home />}/>
            <Route path="/login" component={LoginForm} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default Pages;
