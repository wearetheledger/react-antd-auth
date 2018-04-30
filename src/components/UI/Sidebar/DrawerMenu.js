import 'rc-drawer-menu/assets/index.css';
import React from 'react';
import DrawerMenu from 'rc-drawer-menu';
import Sidebar from './Sidebar';
import PropTypes from 'prop-types';

const UISidebarDrawerMenu = props =>
    props.isMobile ? (
        <DrawerMenu
            parent={null}
            level={null}
            iconChild={null}
            open={!props.collapsed}
            onMaskClick={() => {
                props.toggleCollapse(true);
            }}
            width="256px">
            <Sidebar
                {...props}
                collapsed={props.isMobile ? false : props.collapsed}
            />
        </DrawerMenu>
    ) : (
        <Sidebar {...props} />
    );

UISidebarDrawerMenu.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool,
    toggleCollapse: PropTypes.func.isRequired
};

export default UISidebarDrawerMenu;
