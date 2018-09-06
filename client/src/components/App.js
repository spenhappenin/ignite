import React, { Component, } from 'react';
import AuthRoute from './AuthRoute';
import FetchCompanies from './companies/FetchCompanies';
import FetchUser from './FetchUser';
import Flash from './Flash';
import RenderLanding from './root/RenderLanding';
import Login from './Login';
import NavBar from './NavBar';
import NoMatch from './NoMatch';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import { Route, Switch, } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <Flash />
        <FetchUser>
          <Switch>
            <Route exact path='/' component={RenderLanding} />
            <AuthRoute exact path='/login' component={Login} />
            <AuthRoute exact path='/register' component={Register} />
            <ProtectedRoute path='/companies' component={FetchCompanies} />
            <Route component={NoMatch} />
          </Switch>
        </FetchUser>
      </div>
    );
  };
};

export default App;
