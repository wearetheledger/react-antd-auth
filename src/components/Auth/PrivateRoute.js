import { Redirect, Route } from 'react-router';
import React from 'react';
import { connect } from 'react-redux';

const AuthPrivateRoute = ({
    component: Component,
    isAuthenticated,
    ...rest
}) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.authenticated,
        loading: state.auth.loading
    };
};

export default connect(mapStateToProps)(AuthPrivateRoute);
