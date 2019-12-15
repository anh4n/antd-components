import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import {
    DEFAULT_LOCALE,
    DEFAULT_THEME,
    LocaleProvider,
    ThemeProvider,
    Logo,
    Header,
    renderRoutes,
    Select
} from '../src';
import { Row, Col } from 'antd';
import { Wrapper } from './components/utils';
import { routes } from './routes';
import { Menu } from './Menu';

/**
 * @return {React.Component}
 *
 * @constructor
 */
const App = () => {
    const [locale, setLocale] = useState(DEFAULT_LOCALE);
    const [theme, setTheme] = useState(DEFAULT_THEME);
    const [color, setColor] = useState('antd-red');

    const onLocaleChange = (value) => {
        setLocale(value);
    };

    const onThemeChange = (value) => {
        setTheme(value);
    };

    const onColorChange = (value) => {
        setColor(value);
    };

    const menuRoutes = [
        {
            key: 'github',
            label: 'GitHub',
            icon: 'github',
            url: 'https://github.com/anh4n/antd-components'
        },
        {
            key: 'npm',
            label: 'NPM',
            url: 'https://www.npmjs.com/package/@react-hangar/antd-components',
        }
    ];

    const extra = [
        <Select
            key={'theme'}
            style={{ padding: 5 }}
            size={'small'}
            value={theme}
            onChange={onThemeChange}
            options={[
                { label: 'Light', value: 'light' },
                { label: 'Dark', value: 'dark' },
            ]}
        />,
        <Select
            key={'color'}
            style={{ padding: 5 }}
            size={'small'}
            value={color}
            onChange={onColorChange}
            options={[
                { label: 'Red', value: 'antd-red' },
                { label: 'Blue', value: 'antd' },
                { label: 'Pink', value: 'antd-pink' },
                { label: 'Mint', value: 'antd-mint' },
            ]}
        />,
        <Select
            key={'locale'}
            size={'small'}
            value={locale}
            onChange={onLocaleChange}
            options={[
                { label: 'English', value: 'en_US' },
                { label: 'Deutsch', value: 'de_DE' },
                { label: 'Srpski', value: 'sr_RS' },
            ]}
        />
    ];

    const sider = [
        <Logo key={'logo'} image={`images/logo-${theme}.png`}>React Hangar</Logo>,
        ...extra
    ];

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
                        <Row>
                            <Header
                                logo={<Logo image={`images/logo-${theme}.png`} version={`v${PACKAGE_VERSION}`}>Antd Components</Logo>}
                                menuRoutes={menuRoutes}
                                extra={extra}
                                sider={sider}
                                siderRoutes={[...routes, ...menuRoutes]}
                                siderProps={{ openSubmenus: 'all' }}
                            />
                        </Row>
                        <Row>
                            <Col style={{ height: '100vh' }} xs={0} md={8} xl={5} xxl={4}>
                                <Menu/>
                            </Col>
                            <Col xs={24} md={16} xl={19} xxl={20}>
                                <Wrapper className={'markdown-body'}>
                                    {renderRoutes(routes)}
                                </Wrapper>
                            </Col>
                        </Row>
                    </LocaleProvider>
                </ThemeProvider>
            </Router>
        </div>
    );
};

export default hot(App);
