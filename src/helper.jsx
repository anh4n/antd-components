import React from 'react';

export const emptyFn = () => {};

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
