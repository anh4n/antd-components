import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Col, Icon, Layout, Row } from 'antd';
import { emptyFn } from '../helper';
import { ThemeContext } from '..';

const { Header: AntdHeader } = Layout;

export const Header = (props) => {
    const { extra, logo, menu, version, onBurgerClick, children, ...restProps } = props;

    const { theme } = useContext(ThemeContext);

    const renderBurgerIcon = () => (
        logo ?
            <Col xs={2} md={0} xl={0} xxl={0}>
                <Icon className='burger-icon' type='menu' onClick={onBurgerClick}/>
            </Col> : null
    );

    const renderLogo = () => (
        logo ? <Col xs={18} md={8} xl={5} xxl={4}>{logo}</Col> : null
    );

    const renderMenu = () => (
        menu ? <Col xs={0} md={13} xl={12} xxl={13}>{menu}</Col> : null
    );

    const renderExtra = () => (
        extra ? <Col xs={0} md={0} xl={6} xxl={6}>{extra}</Col> : null
    );

    const renderVersion = () => (
        version ? <Col xs={4} md={3} xl={1} xxl={1}><div className={'version'}>{version}</div></Col> : null
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
    onBurgerClick: emptyFn
};

Header.propTypes = {
    extra: PropTypes.element,
    logo: PropTypes.element,
    menu: PropTypes.element,
    version: PropTypes.string,
    onBurgerClick: PropTypes.func
};
