import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Home from '../pages/Home';
import Solutions from '../pages/Solutions';
import Posts from './Posts';
import Finance from '../pages/Finance';
import Careers from '../pages/Careers';
import Community from "../pages/Community";
import LoginForm from "../pages/loginForm";
import SignupForm from "../pages/signupForm";

function App() {
  const [registered, setRegistered] = React.useState(false);

  return (
    <Router>
      <div className="App">
      
        <Switch>
          <Route exact path="/">
            {registered ? (
              <Redirect to="/home" />
            ) : (
              <SignupForm setRegistered={setRegistered} />
            )}
          </Route>
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
          <Route path="/home" component={Home} />
         <Route path="/finance" component={Finance} /> 
          <Route path="/careers" component={Careers} /> 
          <Route path="/community" component={Community} /> 
          <Route path="/blogs" component={Posts} /> 
          <Route path="/solutions" component={Solutions} />
          <Redirect from="/" to="/home" />
        </Switch>
      </div>
    </Router>
  );
}
  
export default App;

  // return (
  //   <div className="pages">
  //     <div className="page">
  //       <Router>
  //         <Switch>
  //           <Route path="/login" component={LoginForm} />
  //           <Route path="/signup" component={SignupForm} />
  //           <Route path="/home" component={Home} />
  //           <Route path="/finance" component={Finance} /> 
  //           <Route path="/careers" component={Careers} /> 
  //           <Route path="/community" component={Community} /> 
  //           <Route path="/blogs" component={Posts} /> 
  //           <Route path="/solutions" component={Solutions} />
  //           <Redirect from="/" to="/home" />
  //         </Switch>
  //       </Router>
  //     </div>
  //   </div>
//   );
// }

