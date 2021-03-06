import React, { Fragment, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Icon, Layout, Row } from 'antd';
import { Flyout, SideNavi } from '@root/Navigation';
import { sumBreakPoints } from '@root/Header';
import { ThemeContext } from '@root/Themes';
import { MotionDrawer } from '@root';
import { isEmpty } from '@root/object';

const { Header: AntdHeader } = Layout;

const BURGER_BREAKPOINTS = { xs: 3, md: 0, xl: 0, xxl: 0 };
const LOGO_BREAKPOINTS = { xs: 21, md: 8, xl: 5, xxl: 4 };
const MENU_BREAKPOINTS = { xs: 0, md: 16, xl: 13, xxl: 14 };
const EXTRA_BREAKPOINTS = { xs: 0, md: 0, xl: 6, xxl: 6 };
const HEADER_BREAKPOINTS = { xs: 24, md: 24, xl: 24, xxl: 24 };

export const Header = (props) => {
    const {
        extra,
        extraBreakpoints,
        logo,
        headerBreakpoints,
        menuBreakpoints,
        menuPosition,
        menuProps,
        menuRoutes,
        sider,
        siderRoutes,
        siderProps,
        version,
        children,
        ...restProps
    } = props;

    const [open, setOpen] = useState(false);
    const { theme } = useContext(ThemeContext);

    let extraBP = extraBreakpoints;
    let menuBP = menuBreakpoints;

    if (!menuRoutes) extraBP = sumBreakPoints(extraBP, menuBP);
    if (!extra) menuBP = sumBreakPoints(menuBP, extraBP);

    const sideNaviProps = siderProps || menuProps;

    const burgerStyle = {
        color: theme === 'light' ? '#000' : '#FFF'
    };

    const menuStyle = {
        textAlign: menuPosition
    };

    const renderBurgerIcon = () => (
        <Col {...BURGER_BREAKPOINTS}>
            <Icon className='burger-icon' type='menu' style={burgerStyle} onClick={() => setOpen(true)}/>
        </Col>
    );

    const renderLogo = () => (
        logo ? <Col {...LOGO_BREAKPOINTS}>{logo}</Col> : null
    );

    const renderMenu = () => (
        menuRoutes ? <Col {...menuBP} style={menuStyle}><Flyout routes={menuRoutes} {...menuProps}/></Col> : null
    );

    const renderExtra = () => (
        extra ? <Col {...extraBP} className={'extra'}>{extra}</Col> : null
    );

    const renderSideNavi = () => {
        if (isEmpty(sideNaviProps)) return null;

        return (
            <MotionDrawer className={`${theme}-sider`} width={300} open={open} onChange={v => setOpen(v)}>
                <SideNavi routes={siderRoutes || menuRoutes} {...sideNaviProps}>{sider || extra}</SideNavi>
            </MotionDrawer>
        );
    };

    return (
        <Fragment>
            {renderSideNavi()}
            <AntdHeader
                className={`${theme}-header hangar-header`}
                {...restProps}
            >
                <Row>
                    <Col {...headerBreakpoints}>
                        {renderBurgerIcon()}
                        {renderLogo()}
                        {renderMenu()}
                        {renderExtra()}
                        {children}
                    </Col>
                </Row>
            </AntdHeader>
        </Fragment>
    );
};

Header.defaultProps = {
    headerBreakpoints: HEADER_BREAKPOINTS,
    extraBreakpoints: EXTRA_BREAKPOINTS,
    menuBreakpoints: MENU_BREAKPOINTS,
    menuPosition: 'left',
    menuProps: {}
};

Header.propTypes = {
    extra: PropTypes.arrayOf(PropTypes.element),
    extraBreakpoints: PropTypes.object,
    logo: PropTypes.element,
    headerBreakpoints: PropTypes.object,
    menuBreakpoints: PropTypes.object,
    menuPosition: PropTypes.oneOf(['right', 'left']),
    menuProps: PropTypes.object,
    menuRoutes: PropTypes.array,
    sider: PropTypes.arrayOf(PropTypes.element),
    siderProps: PropTypes.object,
    siderRoutes: PropTypes.array,
    version: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
