import React, { Component, } from 'react';
import NavBar from './NavBar';
import AppNavbar from './AppNavbar';
import { connect, } from 'react-redux';
import { withRouter, } from 'react-router-dom';

class RenderNavbar extends Component {
  render() {
    if (!this.props.user.id && this.props.location.pathname === "/")
      return <NavBar />
    return <AppNavbar />
  };
};

const mapStateToProps = (state) => {
  return { user: state.user, };
};

export default withRouter(connect(mapStateToProps)(RenderNavbar));
