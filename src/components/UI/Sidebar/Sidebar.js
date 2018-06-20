import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon, Layout, Menu } from 'antd';
import cn from 'classnames';
import styles from './Sidebar.module.less';
import logo from '../../../assets/images/logo_theledger_icon.svg';
import { withRouter } from 'react-router';

const { Sider } = Layout;

class UISidebar extends React.Component {
    collapse = () => {
        if (this.props.isMobile) {
            this.props.toggleCollapse(true);
        }
    };

    render() {
        const { collapsed, location, toggleCollapse } = this.props;

        return (
            <Sider
                className={styles.sidebar}
                collapsible
                width={256}
                breakpoint="lg"
                collapsed={collapsed}
                trigger={null}
                onCollapse={toggleCollapse}>
                <div className={cn('tl_logo', styles.sidebar_logo)}>
                    <img src={logo} alt="barn logo" />
                    <h1>React boilerplate</h1>
                </div>
                <Menu
                    className={styles.menu}
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['/']}
                    selectedKeys={[location.pathname]}>
                    <Menu.Item key="/">
                        <Link to="/" onClick={this.collapse}>
                            <Icon type="user" />
                            <span>Home</span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="/about-us">
                        <Link to="/about-us" onClick={this.collapse}>
                            <Icon type="video-camera" />
                            <span>About us</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

UISidebar.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool,
    toggleCollapse: PropTypes.func.isRequired
};

export default withRouter(UISidebar);
