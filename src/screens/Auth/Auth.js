import React from 'react';
import { Route } from 'react-router';
import ScreensAuthLogin from './Login/Login';
import ScreensAuthRegister from './Register/Register';
import Auth from '../../components/Auth/Auth';

const ScreensAuth = () => (
    <Auth>
        <Route path="/login" component={ScreensAuthLogin} />
        <Route path="/register" component={ScreensAuthRegister} />
    </Auth>
);

export default ScreensAuth;
