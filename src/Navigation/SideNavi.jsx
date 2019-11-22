import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {Navigation} from './Navigation';
import { ThemeContext } from '..';

export const SideNavi = (props) => {
    const {...restProps} = props;

    const { theme } = useContext(ThemeContext);

    return (
        <Navigation
            theme={theme}
            className={'hangar-side-navi'}
            mode="inline"
            {...restProps}
        />
    );
};

SideNavi.defaultProps = {};

SideNavi.propTypes = {
    openSubmenus: PropTypes.oneOf(['selected', 'all']),
    routes: PropTypes.arrayOf(PropTypes.object)
};

