import React from 'react';
import styled from 'styled-components';
import Fire from '../images/fire.svg';
import { connect, } from 'react-redux';
import { handleLogout, } from '../reducers/user';
import { Button, Menu, } from 'semantic-ui-react';
import { Link, withRouter, } from 'react-router-dom';

class NavBar extends React.Component {

  rightNavs = () => {
    const { user, dispatch, history } = this.props;

    if (user.id) {
      return (
        <Menu.Menu position='right'>
          <Link to='/companies'>
            <NavItem name='COMPANIES' />
          </Link>
          <NavItem
            style={{ color: 'white' }}
            name='LOGOUT'
            onClick={() => dispatch(handleLogout(history))}
          />
        </Menu.Menu>
      );
    }
    return (
      <Menu.Menu position='right' style={{display: 'flex', alignItems: 'center'}}>
        <Link to='/'>
          <NavItem name='FEATURES' />
        </Link>
        <Link to='/'>
          <NavItem name='FAQ' />
        </Link>
        <Link to='/login'>
          <NavItem name='SIGN IN' style={{ color: 'white' }} />
        </Link>
        <SignUpButton to='/register' size='tiny'>
          <NavItem name='SIGN UP' style={{ color: 'white' }} />
        </SignUpButton>
      </Menu.Menu>
    );
  };

  render() {
    return (
      <WebNavbar pointing secondary>
        <Link to='/' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
          <img src={Fire} style={{ height: '60px', }} />
          <Logo name='IGNITE' />
        </Link>
        { this.rightNavs() }
      </WebNavbar>
    );
  };
};

const mapStateToProps = state => {
  return { user: state.user, };
};

const Logo = styled(Menu.Item)`
  font-family: 'Cabin Sketch', cursive !important;
  color: white !important;
  letter-spacing: 1.5px;
  font-size: 38px;
  padding: 10px 0 0 10px !important;
`;

const WebNavbar = styled(Menu)`
  background: #283149 !important; 
  border-bottom: none !important;
  height: 75px;
  display: flex;
  align-items: center;
  margin-bottom: 0 !important;
  padding: 50px 100px 50px 100px;
`;

const AppLogo = styled(Menu.Item)`
  font-family: 'Cabin Sketch', cursive !important;
  /* color: white !important; */
  /* letter-spacing: 1.5px; */
  /* font-size: 38px; */
  /* padding: 10px 0 0 10px !important; */
`;

const AppNavbar = styled(Menu)`
  background: #283149 !important; 
  height: 70px;
  display: flex;
  align-items: center;
  padding: 10px 40px 10px 40px;
`;

const NavItem = styled(Menu.Item)`
  color: white !important;
  font-family: 'Barlow', sans-serif !important;
  letter-spacing: 1.5px;
`;

const SignUpButton = styled(Link)`
  background: #ff8700;
  border-radius: 50px;
  z-index: 999;
  padding: 5px 3px 5px 3px
`;

export default withRouter(connect(mapStateToProps)(NavBar));
