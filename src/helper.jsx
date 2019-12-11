import React from 'react';

export const emptyFn = () => {
};

export const truncateText = (text = '', maxLength) => {
    if (!maxLength) return text;

    if (text.length > maxLength) {
        let index = maxLength;
        while (text.charAt(index) !== ' ') {
            index--;
        }

        return text.substring(0, index) + ' ...';
    }

    return text;
};

export const prettifyJson = (json, space = 4) => (typeof json === 'object')
    ? JSON.stringify(json, undefined, space)
    : json;

const recursiveMap = (children, fn) => {
    if (React.Children.count(children) <= 1) {
        return children;
    }

    return React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
            return child;
        }

        if (child.props.children) {
            child = React.cloneElement(child, {
                children: recursiveMap(child.props.children, fn)
            });
        }

        return fn(child);
    });
};

export const ReactChildren = {
    recursiveMap
};
