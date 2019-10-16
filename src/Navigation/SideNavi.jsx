import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Navigation } from './Navigation';

export const SideNavi = withRouter((props) => {
    const {...restProps} = props;

    return (
        <Navigation
            mode="inline"
            {...restProps}
        />
    );
});

SideNavi.defaultProps = {};

SideNavi.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object),
    openSelected: PropTypes.bool
};

