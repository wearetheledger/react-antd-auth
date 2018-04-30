import React from 'react';
import Home from './Home/Dashboard';
import { Layout } from 'antd';
import { Switch } from 'react-router';
import UIHeader from '../components/UI/Header/Header';
import { enquireScreen } from 'enquire-js';
import UISidebarDrawerMenu from '../components/UI/Sidebar/DrawerMenu';
import AuthPrivateRoute from '../components/Auth/PrivateRoute';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const { Content } = Layout;

let isMobile;
enquireScreen(b => {
    isMobile = b;
});

class Root extends React.Component {
    state = {
        collapsed: false,
        isMobile
    };

    componentDidMount() {
        enquireScreen(mobile => {
            this.setState({
                isMobile: mobile
            });
        });
    }

    toggle = collapse => {
        this.setState({
            collapsed: collapse || !this.state.collapsed
        });
    };

    onMenuClick = ({ item, key, keyPath }) => {
        switch (key) {
            case 'logout':
                this.props.logout();
                break;
            default:
                console.error('Not implemented', key);
        }
    };

    render() {
        const { user, logout } = this.props;
        return (
            <Layout hasSider className="height-100">
                <UISidebarDrawerMenu
                    collapsed={this.state.collapsed}
                    toggleCollapse={this.toggle}
                    isMobile={this.state.isMobile}
                />
                <Layout>
                    <UIHeader
                        onMenuClick={this.onMenuClick}
                        logout={logout}
                        user={user}
                        collapsed={this.state.collapsed}
                        isMobile={this.state.isMobile}
                        toggleCollapse={this.toggle}
                    />
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280
                        }}>
                        <Switch>
                            <AuthPrivateRoute exact path="/" component={Home} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, { logout: () => push('/logout') })(
    Root
);
