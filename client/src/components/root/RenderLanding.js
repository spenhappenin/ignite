import React, { Component, } from 'react';
import ProtectedRoute from '../ProtectedRoute';
import Landing from './Landing';
import Home from './Home';
import { connect, } from 'react-redux';
import { Route, Switch, } from 'react-router-dom';

class RenderLanding extends Component {
  render() {
    return (
      <Switch>
        {
          this.props.user.id ? 
            <ProtectedRoute exact path='/' component={Landing} /> 
          :
            <Route exact path='/' component={Home} />
        }
      </Switch>
    );
  };
};

const mapStateToProps = (state) => {
  return { user: state.user, };
};

export default connect(mapStateToProps)(RenderLanding);
