import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Dropdown, Icon, Layout } from 'antd';
import styles from './Header.module.less';
import UIHeaderMenu from './Menu/Menu';
import Link from 'react-router-dom/es/Link';
import logo from '../../../assets/images/logo_theledger_black.svg';

const { Header } = Layout;

const UIHeader = ({
    collapsed,
    toggleCollapse,
    isMobile,
    user,
    onMenuClick
}) => (
    <Header className={styles.header}>
        <div>
            {isMobile && [
                <Link to="/" className={styles.logo} key="logo">
                    <img src={logo} alt="logo" />
                </Link>
            ]}
            <Icon
                className={styles.trigger}
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={toggleCollapse.bind(this, null)}
            />
            <div className={styles.right}>
                {user.name && (
                    <Dropdown
                        overlay={<UIHeaderMenu onMenuClick={onMenuClick} />}>
                        <span className={`${styles.action} ${styles.account}`}>
                            <Avatar
                                size="small"
                                className={styles.avatar}
                                src={user.picture}
                            />
                            <span>{user.name}</span>
                        </span>
                    </Dropdown>
                )}
            </div>
        </div>
    </Header>
);

UIHeader.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool,
    user: PropTypes.object.isRequired,
    toggleCollapse: PropTypes.func.isRequired,
    onMenuClick: PropTypes.func.isRequired
};

export default UIHeader;
