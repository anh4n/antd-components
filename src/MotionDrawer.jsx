import React from 'react';
import Drawer from 'react-motion-drawer';
import PropTypes from 'prop-types';
import {emptyFn} from '@root/helper';

export const MotionDrawer = (props) => {

    const { position, children, ...restProps} = props;

    return (
        <Drawer
            className={'motion-drawer'}
            right={(position === 'right')}
            zIndex={10}
            {...restProps}
        >
            {children}
        </Drawer>
    );
};

MotionDrawer.defaultProps = {
    width: 400,
    onChange: emptyFn,
    open: false,
    position: 'left',
    drawerStyle: {backgroundColor: '#fff'}
};

MotionDrawer.propTypes = {
    drawerStyle: PropTypes.object,
    open: PropTypes.bool,
    position: PropTypes.string,
    width: PropTypes.number,
    onChange: PropTypes.func
};
