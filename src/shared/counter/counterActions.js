import * as counterActionTypes from './counterReducer';

export const increment = () => {
    return dispatch => {
        dispatch({
            type: counterActionTypes.INCREMENT_REQUESTED
        });

        dispatch({
            type: counterActionTypes.INCREMENT
        });
    };
};

export const incrementAsync = () => {
    return dispatch => {
        dispatch({
            type: counterActionTypes.INCREMENT_REQUESTED
        });

        return setTimeout(() => {
            dispatch({
                type: counterActionTypes.INCREMENT
            });
        }, 3000);
    };
};

export const decrement = () => {
    return dispatch => {
        dispatch({
            type: counterActionTypes.DECREMENT_REQUESTED
        });

        dispatch({
            type: counterActionTypes.DECREMENT
        });
    };
};

export const decrementAsync = () => {
    return dispatch => {
        dispatch({
            type: counterActionTypes.DECREMENT_REQUESTED
        });

        return setTimeout(() => {
            dispatch({
                type: counterActionTypes.DECREMENT
            });
        }, 3000);
    };
};
