import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './redux/store';
import Root from './screens/Root';

import './assets/less/index.less';
import { Route, Switch } from 'react-router';
import ScreensAuth from './screens/Auth/Auth';
import { handleCallback, init, logout } from './shared/auth/authActions';
import { Spin } from 'antd';
import NoPrivateRoute from './components/Auth/NoPrivateRoute';

// Init token in local storage
store.dispatch(init());

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div className="height-100">
                <Switch>
                    <NoPrivateRoute path="/login" component={ScreensAuth} />

                    <Route
                        path="/callback"
                        render={() => {
                            store.dispatch(handleCallback());
                            return (
                                <Spin
                                    tip="Logging in"
                                    size="large"
                                    style={{
                                        textAlign: 'center',
                                        width: '100%'
                                    }}
                                />
                            );
                        }}
                    />

                    <Route
                        path="/logout"
                        render={() => {
                            store.dispatch(logout());
                            return (
                                <Spin
                                    tip="Logging out..."
                                    size="large"
                                    style={{
                                        textAlign: 'center',
                                        width: '100%'
                                    }}
                                />
                            );
                        }}
                    />

                    <Route path="/**" component={Root} />
                </Switch>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.querySelector('#root')
);
