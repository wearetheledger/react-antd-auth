import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu } from 'antd';

const UIHeaderMenu = ({ authenticated, onMenuClick }) => (
    <Menu selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="logout" O>
            <Icon type="logout" />Logout
        </Menu.Item>
    </Menu>
);

UIHeaderMenu.propTypes = {
    onMenuClick: PropTypes.func.isRequired
};

export default UIHeaderMenu;
