import React, { useState } from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom';
import {
    DEFAULT_LOCALE,
    LocaleProvider,
    Flyout,
    MotionDrawer
} from '../src';
import { Row, Col, Icon, Select } from 'antd';
import { Wrapper } from './components/utils';
import { routes } from './routes';
import { Menu } from './Menu';
import { renderRoutes } from '../src/Navigation/routing';
import { Header } from "../src/Header/Header";
import { Logo } from "../src/Logo/Logo";
import * as ReactDOM from "react-dom";

/**
 * @return {React.Component}
 *
 * @constructor
 */
export const App = () => {
    const [locale, setLocale] = useState(DEFAULT_LOCALE);
    const [theme, setTheme] = useState('default');
    const [collapsed, setCollapsed] = useState(false);

    const onLocaleChange = (value) => {
        setLocale(value);
    };

    const onThemeChange = (value) => {
        setTheme(value);
    };

    const onOffcanvasBtnClick = () => {
        setCollapsed(true);
    };

    const onChange = (e) => {
        setCollapsed(e);
    };

    const headerRoutes = [
        {
            key: 'home',
            label: 'Home',
            icon: 'home',
            path: '/',
            exact: true
        },
        {
            key: 'contact',
            label: 'Contact',
            icon: 'edit',
            path: '/Navigation/Contact/Home',
        },
        {
            key: 'Impressum',
            label: 'Impressum',
            icon: 'setting',
            path: '/Navigation/Impressum/Home',
        }
    ];

    let Extra = (
        <div style={{textAlign: 'right', paddingRight: 5}}>
            <Select size={'small'} defaultValue={'1.0.0'} >
                <Select.Option value="1.0.0">V.1.0.0</Select.Option>
            </Select>
            <Select style={{padding: 5}} size={'small'} defaultValue={theme} onChange={onThemeChange}>
                <Select.Option value="default">Default</Select.Option>
                <Select.Option value="pink">Pink</Select.Option>
                <Select.Option value="red">Red</Select.Option>
                <Select.Option value="mint">Mint</Select.Option>
            </Select>
            <Select size={'small'} defaultValue={locale} onChange={onLocaleChange}>
                <Select.Option value="en_US">English</Select.Option>
                <Select.Option value="de_DE">Deutsch</Select.Option>
                <Select.Option value="sr_RS">Srpski</Select.Option>
            </Select>
        </div>
    );

    let bla = ReactDOM.createPortal(
        (<link rel="stylesheet" href={`/Themes/${theme}.css`} type="text/css"></link>),
        document.head
    );

    return (
        <div id={theme}>
            {bla}
            <Router>
                    <LocaleProvider locale={locale} setLocale={setLocale}>

                        <MotionDrawer width={400} collapsed={collapsed} onChange={onChange}>
                            <Menu />
                        </MotionDrawer>

                        <Row>
                            <Header>
                                <Row>
                                    <Col xs={2} md={0} xl={0} xxl={0}>
                                        <Icon
                                            className="burger-icon show-mobile-hide-desktop"
                                            type='menu'
                                            onClick={onOffcanvasBtnClick}
                                        />
                                    </Col>

                                    <Col xs={22} md={6} xl={5} xxl={4}>
                                        <Logo text={'React Hangar'} textColor={'#1b1b1b'} textFontSize={'20px'}/>
                                    </Col>

                                    <Col xs={0} md={10} xl={14} xxl={15}>
                                        <Flyout routes={headerRoutes} openSubmenus='selected'/>
                                    </Col>

                                    <Col xs={0} md={8} xl={5} xxl={5}>
                                        {Extra}
                                    </Col>
                                </Row>
                            </Header>
                        </Row>

                        <Row>
                            <Col style={{height: '100vh'}} xs={0} md={6} xl={5} xxl={4}>
                                <Menu />
                            </Col>
                            <Col xs={24} md={18} xl={19} xxl={20}>
                                <Wrapper className={'markdown-body'}>
                                    <Switch>
                                        {renderRoutes(routes)}
                                    </Switch>
                                </Wrapper>
                            </Col>
                        </Row>

                    </LocaleProvider>
            </Router>
        </div>
    );
};
