import { Button } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../../shared/auth/authActions';
import { withRouter } from 'react-router-dom';

class ScreensAuthLogin extends React.PureComponent {
    render() {
        const { loading, login } = this.props;

        return (
            <div>
                <Button
                    loading={loading}
                    size="large"
                    type="primary"
                    className="d-block auth0"
                    onClick={login}
                    htmlType="submit">
                    Login with Auth0
                </Button>
                <Button
                    loading={loading}
                    size="large"
                    type="primary"
                    className="d-block civic"
                    htmlType="submit">
                    Login with Civic
                </Button>
                <hr />
                Build number: v0.0.1
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.auth.loading
});

export default withRouter(
    connect(mapStateToProps, { login })(ScreensAuthLogin)
);
