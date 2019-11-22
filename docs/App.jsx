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
import { Header } from '../src/Header/Header';
import { Logo } from '../src/Logo/Logo';
import * as ReactDOM from 'react-dom';
import {DEFAULT_THEME, ThemeProvider} from '../src/Themes';

/**
 * @return {React.Component}
 *
 * @constructor
 */
export const App = () => {
    const [locale, setLocale] = useState(DEFAULT_LOCALE);
    const [theme, setTheme] = useState(DEFAULT_THEME);
    const [color, setColor] = useState('antd-red');
    const [open, setOpen] = useState(false);

    const onLocaleChange = (value) => {
        setLocale(value);
    };

    const onThemeChange = (value) => {
        setTheme(value);
    };

    const onColorChange = (value) => {
        setColor(value);
    };

    const onDrawerBtnClick = () => {
        setOpen(true);
    };

    const onChange = (e) => {
        setOpen(e);
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

    const Extra = (
        <div style={{textAlign: 'right', paddingRight: 5}}>
            <Select size={'small'} defaultValue={'1.0.0'} >
                <Select.Option value="1.0.0">V.1.0.0</Select.Option>
            </Select>
            <Select style={{padding: 5}} size={'small'} value={theme} onChange={onThemeChange}>
                <Select.Option value="light">Light</Select.Option>
                <Select.Option value="dark">Dark</Select.Option>
            </Select>
            <Select style={{padding: 5}} size={'small'} value={color} onChange={onColorChange}>
                <Select.Option value="antd-red">Red</Select.Option>
                <Select.Option value="antd">Blue</Select.Option>
                <Select.Option value="antd-pink">Pink</Select.Option>
                <Select.Option value="antd-mint">Mint</Select.Option>
            </Select>
            <Select size={'small'} value={locale} onChange={onLocaleChange}>
                <Select.Option value="en_US">English</Select.Option>
                <Select.Option value="de_DE">Deutsch</Select.Option>
                <Select.Option value="sr_RS">Srpski</Select.Option>
            </Select>
        </div>
    );

    const ColorSwitch = ReactDOM.createPortal(
        (<link rel="stylesheet" href={`dist/${color}.css`} type="text/css"></link>),
        document.head
    );

    return (
        <div id={color}>
            {ColorSwitch}
            <Router>
                <ThemeProvider theme={theme} setTheme={setTheme}>
                    <LocaleProvider locale={locale} setLocale={setLocale}>

                        <MotionDrawer width={400} open={open} onChange={onChange}>
                            <Menu />
                        </MotionDrawer>

                        <Row>
                            <Header>
                                <Row>
                                    <Col xs={2} md={0} xl={0} xxl={0}>
                                        <Icon
                                            className="burger-icon show-mobile-hide-desktop"
                                            type='menu'
                                            onClick={onDrawerBtnClick}
                                        />
                                    </Col>

                                    <Col xs={22} md={6} xl={5} xxl={4}>
                                        <Logo image={`images/logo-${theme}.png`}>React Hangar</Logo>
                                    </Col>

                                    <Col xs={0} md={10} xl={13} xxl={14}>
                                        <Flyout routes={headerRoutes} openSubmenus='selected'/>
                                    </Col>

                                    <Col xs={0} md={8} xl={6} xxl={6}>
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
                </ThemeProvider>
            </Router>
        </div>
    );
};
