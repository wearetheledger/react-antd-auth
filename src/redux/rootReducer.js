import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from '../shared/auth/authReducer';

export default combineReducers({
    router: routerReducer,
    auth
});
