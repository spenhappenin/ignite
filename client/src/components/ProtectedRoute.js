import React from 'react';
import { connect, } from 'react-redux';
import { Route, Redirect, } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      renderMergedProps(Component, props, rest)
    ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
  )}
  />
);

const mapStateToProps = state => {
  return { isAuthenticated: state.user.id };
};

// component => ???
// rest => an array of the rest (additional props) and routeProps (props routes gives us)
const renderMergedProps = (component, ...rest) => {
  // finalProps => takes everything and makes it one big object
  const finalProps = Object.assign({}, ...rest);
  return (
    // create a new React element with the component and final props
    React.createElement(component, finalProps)
  );
}

export default connect(mapStateToProps)(ProtectedRoute);
