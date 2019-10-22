import React from 'react';

export const emptyFn = () => {};

export const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        let index = maxLength;
        while (text.charAt(index) !== ' ') {
            index--;
        }

        return text.substring(0, index) + ' ...'
    }

    return text;
};
