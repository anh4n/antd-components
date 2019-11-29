import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Col, Icon, Layout, Row } from 'antd';
import { emptyFn } from '../helper';
import { ThemeContext } from '..';
import { sumBreakPoints } from '.';

const { Header: AntdHeader } = Layout;

const BURGER_BREAKPOINTS = { xs: 2, md: 0, xl: 0, xxl: 0 };
const LOGO_BREAKPOINTS = { xs: 18, md: 8, xl: 5, xxl: 4 };
const MENU_BREAKPOINTS = { xs: 0, md: 13, xl: 12, xxl: 13 };
const EXTRA_BREAKPOINTS = { xs: 0, md: 0, xl: 6, xxl: 6 };
const VERSION_BREAKPOINTS = { xs: 4, md: 3, xl: 1, xxl: 1 };

export const Header = (props) => {
    const {
        extra,
        extraBreakpoints,
        logo,
        menu,
        menuBreakpoints,
        menuPosition,
        version,
        onBurgerClick,
        children,
        ...restProps
    } = props;

    const { theme } = useContext(ThemeContext);

    let extraBP = extraBreakpoints;
    let menuBP = menuBreakpoints;

    if (!menu) extraBP = sumBreakPoints(extraBP, menuBP);
    if (!extra) menuBP = sumBreakPoints(menuBP, extraBP);

    const burgerStyle = {
        color: theme === 'light' ? '#000' : '#FFF'
    };

    const menuStyle = {
        textAlign: menuPosition
    };

    const renderBurgerIcon = () => (
        <Col {...BURGER_BREAKPOINTS}>
            <Icon className='burger-icon' type='menu' style={burgerStyle} onClick={onBurgerClick}/>
        </Col>
    );

    const renderLogo = () => (
        logo ? <Col {...LOGO_BREAKPOINTS}>{logo}</Col> : null
    );

    const renderMenu = () => (
        menu ? <Col {...menuBP} style={menuStyle}>{menu}</Col> : null
    );

    const renderExtra = () => (
        extra ? <Col {...extraBP} style={{ textAlign: 'right' }}>{extra}</Col> : null
    );

    const renderVersion = () => (
        version ? <Col {...VERSION_BREAKPOINTS}>
            <div className={'version'}>{version}</div>
        </Col> : null
    );

    return (
        <AntdHeader
            className={`${theme}-header hangar-header`}
            {...restProps}
        >
            <Row>
                {renderBurgerIcon()}
                {renderLogo()}
                {renderMenu()}
                {renderExtra()}
                {renderVersion()}
                {children}
            </Row>
        </AntdHeader>
    );
};

Header.defaultProps = {
    onBurgerClick: emptyFn,
    menuBreakpoints: MENU_BREAKPOINTS,
    menuPosition: 'left',
    extraBreakpoints: EXTRA_BREAKPOINTS
};

Header.propTypes = {
    extra: PropTypes.element,
    extraBreakpoints: PropTypes.object,
    logo: PropTypes.element,
    menu: PropTypes.element,
    menuBreakpoints: PropTypes.object,
    menuPosition: PropTypes.oneOf(['right', 'left']),
    version: PropTypes.string,
    onBurgerClick: PropTypes.func
};
