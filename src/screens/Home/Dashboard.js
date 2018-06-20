import React from 'react';
import { connect } from 'react-redux';
import CarService from '../../shared/services/api/cars';

class ScreensHomeDashboard extends React.Component {
    componentDidMount() {
        console.log('getCars');
        CarService.getCars()
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
            </div>
        );
    }
}

export default connect()(ScreensHomeDashboard);
