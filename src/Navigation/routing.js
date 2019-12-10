import React from 'react';
import { matchPath, Route } from 'react-router';
import { NotFound } from '@root/Navigation/NotFound';

const buildRoutes = (routes, parentPath = '') => (
    routes.map(route => {
        const {key, submenu, path} = route;
        const currentPath = parentPath + path;

        if (submenu) {
            return buildRoutes(submenu, currentPath);
        }

        return <Route key={key} {...route} path={currentPath} />;
    })
);

export const renderRoutes = (routes, config) => {

    const defaults = {
        notFound: true,
        ...config
    };

    if (defaults.notFound) {
        routes.push({
            key: 'notfound',
            path: '*',
            exact: true,
            component: NotFound,
            hideInMenu: true
        });
    }

    return buildRoutes(routes);
};

export const getActiveRoutes = (routes, location, parentPath = '') => {
    let activeRoutes = [];

    routes.forEach(route => {
        const currentPath = parentPath + route.path;

        const match = matchPath(location.pathname, {
            path: currentPath,
            exact: route.exact || false,
            strict: route.strict || false
        });

        if (match) {
            activeRoutes.push(route.key);
        }

        const subitem = route.submenu || route.group;

        if (subitem) {
            activeRoutes = [
                ...activeRoutes,
                ...getActiveRoutes(subitem, location, route.group ? parentPath : currentPath)
            ];
        }
    });

    return activeRoutes;
};

export const getAllSubmenuRoutes = (routes) => {
    let activeRoutes = [];

    routes.forEach(route => {
        const subitem = route.submenu || route.group;

        if (subitem) {
            if (route.submenu) {
                activeRoutes.push(route.key);
            }

            activeRoutes = [
                ...activeRoutes,
                ...getAllSubmenuRoutes(subitem)
            ];
        }
    });

    return activeRoutes;
};
