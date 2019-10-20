import { matchPath, Route } from 'react-router';
import React from 'react';

export const renderRoutes = (routes, parentPath = '') => (
    routes.map(route => {
        const {submenu, path} = route;
        const currentPath = parentPath + path;

        if (submenu) {
            return renderRoutes(submenu, currentPath);
        }

        return <Route {...route} path={currentPath} />;
    })
);

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
