import React from 'react';
import styled from 'styled-components';
import Fire from '../images/fire.svg';
import SettingsIcon from '../images/gear-option.svg';
import UserIcon from '../images/user-silhouette.svg';
import { connect, } from 'react-redux';
import { handleLogout, } from '../reducers/user';
import { Menu, Popup, } from 'semantic-ui-react';
import { Link, NavLink, withRouter, } from 'react-router-dom';

class AppNavbar extends React.Component {

  rightNavs = () => {
    const { user, dispatch, history } = this.props;

    if (user.id) {
      return (
        <Menu.Menu position='right' style={{ display: 'flex', alignItems: 'center' }}>
          <SettingsIconContainer src={SettingsIcon} />
          {/* <UserIconContainer onClick={() => dispatch(handleLogout(history))}> */}
          <Popup 
            trigger={
              <UserIconContainer>
                <img src={UserIcon} style={{ height: '22px', width: '22px', }} />
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

  popupContent = () => (
    <div style={{ width: '200px', }}>
      <div style={{ marginBottom: '20px', }}>
        <h3 style={{ marginBottom: 0, }}>{ this.props.user.name ? this.props.user.name : 'No Name Added' }</h3>
        <p style={{ color: '#636363', }}>{ this.props.user.email }</p>
      </div>
      <hr />
      <div>
        <PopupItem to='/'>
          <p>Settings</p>
        </PopupItem>
        <SignOut onClick={() => this.props.dispatch(handleLogout(this.props.history))}>Sign Out</SignOut>
      </div>
    </div>
  );

  render() {
    return (
      <StyledAppNavbar pointing secondary>
        <StyledNavLink 
          to='/' 
          style={{ display: 'flex', alignItems: 'center', marginRight: '30px', }}
          activeStyle={{ color: "white", }}
        >
          <img src={Fire} style={{ height: '50px', }} />
        </StyledNavLink>
        <StyledNavLink to='/companies' activeStyle={{ color: "white", }}>
          Companies
        </StyledNavLink>
        <StyledNavLink to='/topics' activeStyle={{ color: "white", }}>
          Topics
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
