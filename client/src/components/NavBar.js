import React from 'react';
import styled from 'styled-components';
import Fire from '../images/fire.svg';
import { connect, } from 'react-redux';
import { handleLogout, } from '../reducers/user';
import { Menu, } from 'semantic-ui-react';
import { Link, NavLink, withRouter, } from 'react-router-dom';

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
      <Menu.Menu position='right' style={{ display: 'flex', alignItems: 'center' }}>
        <NavItem>
          <StyledNavLink to='/features' activeStyle={{ color: "white", }}>FEATURES</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to='/faq' activeStyle={{ color: "white", }}>FAQ</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to='/login' activeStyle={{ color: "white", }}>SIGN IN</StyledNavLink>
        </NavItem>
        <SignUpButton to='/register'>
          <NavItem name='SIGN UP' style={{ color: 'white', }} />
        </SignUpButton>
      </Menu.Menu>
    );
  };

  render() {
    return (
      <WebNavbar pointing secondary>
        <Link to='/' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
          <img src={Fire} style={{ height: '60px', }} alt="logo" />
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

const StyledNavLink = styled(NavLink)`
  color: #8c939b;
  font-family: 'Barlow', sans-serif !important;
  letter-spacing: 1px;
  font-size: 14px;
  padding-left: 16px;
  padding-right: 16px;

   &:hover {
     color: white;
   }
`;

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

const NavItem = styled(Menu.Item)`
  color: white !important;
  font-family: 'Barlow', sans-serif !important;
  letter-spacing: 1.5px;
  padding-left: 5px !important;
  padding-right: 5px !important;
`;

const SignUpButton = styled(NavLink)`
  background: #ff8700;
  border-radius: 50px;
  z-index: 999;
  padding: 5px 3px 5px 3px;
  transition: background 0.2s ease, border 0.2s ease;
  padding-left: 16px !important;
  padding-right: 16px !important;

  &:hover {
    background: #c46800;
    transition: background 0.2s ease, border 0.2s ease;
  }
`;

export default withRouter(connect(mapStateToProps)(NavBar));
