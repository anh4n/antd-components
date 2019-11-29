import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch } from 'react-router-dom';
import {
    DEFAULT_LOCALE,
    DEFAULT_THEME,
    LocaleProvider,
    ThemeProvider,
    MotionDrawer,
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

    const Extra = (
        <div style={{ textAlign: 'right' }}>
            <Select
                style={{ padding: 5 }}
                size={'small'}
                value={theme}
                onChange={onThemeChange}
                options={[
                    { label: 'Light', value: 'light' },
                    { label: 'Dark', value: 'dark' },
                ]}
            />
            <Select
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
            />
            <Select
                size={'small'}
                value={locale}
                onChange={onLocaleChange}
                options={[
                    { label: 'English', value: 'en_US' },
                    { label: 'Deutsch', value: 'de_DE' },
                    { label: 'Srpski', value: 'sr_RS' },
                ]}
            />
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

                        <MotionDrawer width={300} open={open} onChange={onChange}>
                            <Menu/>
                        </MotionDrawer>

                        <Row>
                            <Header
                                logo={<Logo image={`images/logo-${theme}.png`}>React Hangar</Logo>}
                                extra={Extra}
                                onBurgerClick={onDrawerBtnClick}
                                version={'v1.0.0'}
                            />
                        </Row>

                        <Row>
                            <Col style={{ height: '100vh' }} xs={0} md={8} xl={5} xxl={4}>
                                <Menu/>
                            </Col>
                            <Col xs={24} md={16} xl={19} xxl={20}>
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
