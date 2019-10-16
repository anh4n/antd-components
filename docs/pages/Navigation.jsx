import React, { Fragment } from 'react';
import { Display3 } from '../../src';
import Flyout from '../examples/Navigation/Flyout';
import SideNavi from '../examples/Navigation/SideNavi';

/**
 * @return {React.Component}
 */
export const FlyoutNavigationComponent = () => {
    return (
        <Fragment>
            <Display3>Flyout Navigation</Display3>
            <Flyout/>
        </Fragment>
    );
};

/**
 * @return {React.Component}
 */
export const SideNavigationComponent = () => {
    return (
        <Fragment>
            <Display3>Side Navigation</Display3>
            <SideNavi/>
        </Fragment>
    );
};