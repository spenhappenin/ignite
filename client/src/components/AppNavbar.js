import React from 'react';
import styled from 'styled-components';
import Fire from '../images/fire.svg';
import SettingsIcon from '../images/gear-option.svg';
import UserIcon from '../images/user-silhouette.svg';
import { connect, } from 'react-redux';
import { handleLogout, } from '../reducers/user';
import { Icon, Menu, } from 'semantic-ui-react';
import { Link, withRouter, } from 'react-router-dom';

class AppNavbar extends React.Component {

  rightNavs = () => {
    const { user, dispatch, history } = this.props;

    if (user.id) {
      return (
        <Menu.Menu position='right' style={{ display: 'flex', alignItems: 'center' }}>
          <SettingsIconContainer src={SettingsIcon} />
          <UserIconContainer onClick={() => dispatch(handleLogout(history))}>
            <img src={UserIcon} style={{ height: '22px', width: '22px', }} />
          </UserIconContainer>
        </Menu.Menu>
      );
    };
  };

  render() {
    return (
      <StyledAppNavbar pointing secondary>
        <Link to='/' style={{ display: 'flex', alignItems: 'center', marginRight: '30px', }}>
          <img src={Fire} style={{ height: '50px', }} />
        </Link>
        <Link to='/companies'>
          <NavItem name='Companies' />
        </Link>
        { this.rightNavs() }
      </StyledAppNavbar>
    );
  };
};

const mapStateToProps = state => {
  return { user: state.user, };
};

const StyledAppNavbar = styled(Menu)`
  background: #283149 !important; 
  height: 70px;
  display: flex;
  align-items: center;
  padding: 10px 40px 10px 40px;
`;

const NavItem = styled(Menu.Item)`
  color: white !important;
  font-family: 'Barlow', sans-serif !important;
  letter-spacing: 1px;
  font-size: 14px;
`;

const SettingsIconContainer = styled.img`
  height: 18px;
  width: 18px;
  margin-left: 15px;
  margin-right: 15px;
`;

const UserIconContainer = styled.div`
  border-radius: 51%;
  border: 3px solid #636464;
  padding: 10px;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  background: #c4c4c4;
  transition: background 0.2s ease, border 0.2s ease;
  margin-left: 15px;
  margin-right: 15px;

  &:hover {
    background: #959595;
    border-color: #ffff;
    transition: background 0.2s ease, border 0.2s ease;
  }
`;

export default withRouter(connect(mapStateToProps)(AppNavbar));
