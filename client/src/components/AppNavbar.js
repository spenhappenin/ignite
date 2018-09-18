import React from 'react';
import styled from 'styled-components';
import trophyColor from '../images/trophy-color.svg';
import trophyColor2 from '../images/trophy-color2.svg';
import trophyColor3 from '../images/trophy-color3.svg';
import trophyWhite from '../images/trophy-white.svg';
import trophyWhite2 from '../images/trophy-white2.svg';
import SettingsIcon from '../images/gear-option.svg';
import UserIcon from '../images/user-silhouette.svg';
import fireWhite from '../images/white-fire-logo.svg';
import { connect, } from 'react-redux';
import { handleLogout, } from '../reducers/user';
import { Menu, Popup, } from 'semantic-ui-react';
import { Link, NavLink, withRouter, } from 'react-router-dom';

class AppNavbar extends React.Component {

  rightNavs = () => {
    const { user, } = this.props;

    if (user.id) {
      return (
        <Menu.Menu position='right' style={{ display: 'flex', alignItems: 'center' }}>
          <SettingsIconContainer src={SettingsIcon} />
          <Popup 
            trigger={
              <UserIconContainer>
                <img src={UserIcon} style={{ height: '22px', width: '22px', }} alt="settings" />
              </UserIconContainer>
            }
            content={this.popupContent}
            on='click'
            position='bottom center'
            hideOnScroll
          />
        </Menu.Menu>
      );
    };
  };

  popupContent = () => {
    const { user: { email, first_name, last_name, }, } = this.props;
    return (
      <div style={{ width: '200px', }}>
        <div style={{ marginBottom: '20px', }}>
          <h3 style={{ marginBottom: 0, }}>{ first_name && last_name ? `${first_name} ${last_name}` : 'No Name Added' }</h3>
          <p style={{ color: '#636363', }}>{ email }</p>
        </div>
        <hr />
        <div>
          <PopupItem to='/settings'>
            <p>Settings</p>
          </PopupItem>
          <SignOut onClick={() => this.props.dispatch(handleLogout(this.props.history))}>Sign Out</SignOut>
        </div>
      </div>
    )
  };

  render() {
    return (
      <StyledAppNavbar pointing secondary>
        <StyledNavLink 
          to='/' 
          style={{ display: 'flex', alignItems: 'center', marginRight: '10px', }}
          activeStyle={{ color: "white", }}
        >
          <img src={trophyWhite2} style={{ height: '60px', }} alt="logo" />
          {/* <img src={trophyColor2} style={{ height: '60px', }} /> */}
        </StyledNavLink>
        <StyledNavLink to='/companies' activeStyle={{ color: "white", }}>
          Companies
        </StyledNavLink>
        <StyledNavLink to='/applications' activeStyle={{ color: "white", }}>
          Applications
        </StyledNavLink>
        <StyledNavLink to='/statistics' activeStyle={{ color: "white", }}>
          Statistics
        </StyledNavLink>
        { this.rightNavs() }
      </StyledAppNavbar>
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

const SignOut = styled.p`
  cursor: pointer;
  margin-top: 10px;
  color: #ff5600;
  font-weight: bold;
  padding: 8px 10px 8px 5px;
  display: flex;

  &:hover {
    background: #ededed;
  }
`;

const PopupItem = styled(Link)`
  display: flex;
  padding: 8px 10px 8px 5px;
  border-radius: 3px;

  &:hover {
    background: #ededed;
  }

  > p {
    color: black;
  }
`;

const StyledAppNavbar = styled(Menu)`
  /* background: #283149 !important;  */
  background: #22313f !important; 
  height: 70px;
  display: flex;
  align-items: center;
  padding: 10px 40px 10px 40px;
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
