import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Menu } from 'antd';

const renderLabel = (label, icon) => {
    return (
        <Fragment>
            {icon ? <Icon type={icon}/> : null}{label}
        </Fragment>
    );
};

const renderMenuItem = ({ key, label, path, icon }) => (
    <Menu.Item key={key}>
        <NavLink to={path}>{renderLabel(label, icon)}</NavLink>
    </Menu.Item>
);

export const renderMenu = (routes, parentPath = '') => (
    routes.map(route => {
        const { key, label, path, icon, hideInMenu, submenu, group } = route;
        const currentPath = parentPath + path;

        if (hideInMenu) return null;

        if (group) {
            return (
                <Menu.ItemGroup key={key} title={label}>
                    {renderMenu(group, parentPath)}
                </Menu.ItemGroup>
            );
        }

        if (submenu) {
            return (
                <Menu.SubMenu key={key} title={renderLabel(label, icon)}>
                    {renderMenu(submenu, currentPath)}
                </Menu.SubMenu>
            );
        }

        return renderMenuItem({ key, label, path: currentPath, icon });
    })
);
