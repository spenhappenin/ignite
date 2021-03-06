import React, { Component, } from 'react';
import Applications from "./Applications";
import Application from "./Application";
import ApplicationForm from "./ApplicationForm";
import AuthRoute from './AuthRoute';
import ContactForm from './ContactForm';
import FetchCompanies from './companies/FetchCompanies';
import FetchUser from './FetchUser';
import Flash from './Flash';
import RenderLanding from './root/RenderLanding';
import Login from './Login';
import NoMatch from './NoMatch';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import RenderNavbar from './RenderNavbar';
import Settings from "./Settings";
import StepForm from "./steps/StepForm";
import { Route, Switch, } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div>
        <RenderNavbar />
        <Flash />
        <FetchUser>
          <Switch>
            <Route exact path='/' component={RenderLanding} />
            <AuthRoute exact path='/login' component={Login} />
            <AuthRoute exact path='/register' component={Register} />
            <ProtectedRoute exact path="/applications" component={Applications} />
            <ProtectedRoute exact path="/applications/new" component={ApplicationForm} />
            <ProtectedRoute exact path="/applications/edit/:id" component={ApplicationForm} />
            <ProtectedRoute exact path="/applications/:id" component={Application} />
            <ProtectedRoute path='/applications/:id/steps/new' component={StepForm} />
            <ProtectedRoute exact path="/companies/:company_id/contacts/new" component={ContactForm} />
            <ProtectedRoute exact path="/companies/:company_id/contacts/:id" component={ContactForm} />
            <ProtectedRoute path='/companies' component={FetchCompanies} />
            <ProtectedRoute exact path="/settings" component={Settings} />
            <Route component={NoMatch} />
          </Switch>
        </FetchUser>
      </div>
    );
  };
};

export default App;
