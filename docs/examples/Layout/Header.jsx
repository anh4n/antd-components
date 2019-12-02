// Template File for Components Examples
import React, { Fragment } from 'react';
import { ComponentDisplay } from '../../components/ComponentDisplay';
import { Code } from '../../components/utils';
import { Button, Header, Logo, ThemeProvider } from '../../../src';

// Example implementation
const Example = () => {

    const routes = [
        {
            key: 'home',
            label: 'Home',
            icon: 'home',
            path: '/Layout/Header',
            exact: true
        },
        {
            key: 'contact',
            label: 'Contact',
            icon: 'edit',
            path: '/Layout/Header/Contact',
        },
        {
            key: 'Impressum',
            label: 'Impressum',
            icon: 'setting',
            path: '/Layout/Header/Impressum',
        }
    ];

    const extras = (
        <Fragment>
            <Button>Extra 1</Button>
            <Button>Extra 2</Button>
        </Fragment>
    );

    return (
        <Fragment>
            <ThemeProvider theme={'light'}>
                <Header
                    logo={<Logo to={'/Layout/Header'}>No Image</Logo>}
                    menuRoutes={routes}
                    version={'v1.0.0'}
                />
            </ThemeProvider>
            <br/>
            <br/>
            <ThemeProvider theme={'light'}>
                <Header
                    logo={<Logo to={'/Layout/Header'} image={'images/logo-black-blue.png'}/>}
                    menuRoutes={routes}
                    version={'v1.0.0'}
                />
            </ThemeProvider>
            <br/>
            <br/>
            <ThemeProvider theme={'light'}>
                <Header
                    logo={<Logo to={'/Layout/Header'} image={'images/logo-black-blue.png'}>Menu Right</Logo>}
                    menuRoutes={routes}
                    menuPosition={'right'}
                    version={'v1.0.0'}
                />
            </ThemeProvider>
            <br/>
            <br/>
            <ThemeProvider theme={'light'}>
                <Header
                    logo={<Logo to={'/Layout/Header'} image={'images/logo-black-blue.png'}>Extra</Logo>}
                    menuRoutes={routes}
                    extra={extras}
                    version={'v1.0.0'}
                />
            </ThemeProvider>
            <br/>
            <br/>
            <ThemeProvider theme={'light'}>
                <Header
                    logo={<Logo to={'/Layout/Header'} image={'images/logo-black-blue.png'}>Extra Only</Logo>}
                    extra={extras}
                    version={'v1.0.0'}
                />
            </ThemeProvider>
            <br/>
            <br/>
            <ThemeProvider theme={'light'}>
                <Header
                    logo={<Logo to={'/Layout/Header'} image={'images/logo-black-blue.png'}>Light</Logo>}
                    menuRoutes={routes}
                    version={'v1.0.0'}
                />
            </ThemeProvider>
            <br/>
            <br/>
            <ThemeProvider theme={'dark'}>
                <Header
                    logo={<Logo to={'/Layout/Header'} image={'images/logo-white-blue.png'}>Dark</Logo>}
                    menuRoutes={routes}
                    version={'v1.0.0'}
                />
            </ThemeProvider>
        </Fragment>
    );
};

// Code example
// language=JS
const code = `
    import React, { Fragment } from 'react';
    import { Button, Header, Logo, ThemeProvider } from '@react-hangar/antd-components';

    const Example = () => {

        const routes = [
            {
                key: 'home',
                label: 'Home',
                icon: 'home',
                path: '/Layout/Header',
                exact: true
            },
            {
                key: 'contact',
                label: 'Contact',
                icon: 'edit',
                path: '/Layout/Header/Contact',
            },
            {
                key: 'Impressum',
                label: 'Impressum',
                icon: 'setting',
                path: '/Layout/Header/Impressum',
            }
        ];

        const extras = (
            <Fragment>
                <Button>Extra 1</Button>
                <Button>Extra 2</Button>
            </Fragment>
        );

        return (
            <Fragment>
                <ThemeProvider theme={'light'}>
                    <Header
                        logo={<Logo to={'/Layout/Header'}>No Image</Logo>}
                        menuRoutes={routes}
                        version={'v1.0.0'}
                    />
                </ThemeProvider>
                <br/>
                <br/>
                <ThemeProvider theme={'light'}>
                    <Header
                        logo={<Logo to={'/Layout/Header'} image={'images/logo-black-blue.png'}/>}
                        menuRoutes={routes}
                        version={'v1.0.0'}
                    />
                </ThemeProvider>
                <br/>
                <br/>
                <ThemeProvider theme={'light'}>
                    <Header
                        logo={<Logo to={'/Layout/Header'} image={'images/logo-black-blue.png'}>Menu Right</Logo>}
                        menuRoutes={routes}
                        menuPosition={'right'}
                        version={'v1.0.0'}
                    />
                </ThemeProvider>
                <br/>
                <br/>
                <ThemeProvider theme={'light'}>
                    <Header
                        logo={<Logo to={'/Layout/Header'} image={'images/logo-black-blue.png'}>Extra</Logo>}
                        menuRoutes={routes}
                        extra={extras}
                        version={'v1.0.0'}
                    />
                </ThemeProvider>
                <br/>
                <br/>
                <ThemeProvider theme={'light'}>
                    <Header
                        logo={<Logo to={'/Layout/Header'} image={'images/logo-black-blue.png'}>Extra Only</Logo>}
                        extra={extras}
                        version={'v1.0.0'}
                    />
                </ThemeProvider>
                <br/>
                <br/>
                <ThemeProvider theme={'light'}>
                    <Header
                        logo={<Logo to={'/Layout/Header'} image={'images/logo-black-blue.png'}>Light</Logo>}
                        menuRoutes={routes}
                        version={'v1.0.0'}
                    />
                </ThemeProvider>
                <br/>
                <br/>
                <ThemeProvider theme={'dark'}>
                    <Header
                        logo={<Logo to={'/Layout/Header'} image={'images/logo-white-blue.png'}>Dark</Logo>}
                        menuRoutes={routes}
                        version={'v1.0.0'}
                    />
                </ThemeProvider>
            </Fragment>
        );
    };

    export default Example;

`;

// Component props
const properties = [
    { property: 'extra', description: 'Extra component to show in header', type: 'React.Component', default: '' },
    { property: 'extraBreakpoints', description: 'Extra component breakpoints', type: 'object', default: '{ xs: 0, md: 0, xl: 6, xxl: 6 }' },
    { property: 'logo', description: 'Logo component', type: 'Logo', default: '' },
    { property: 'menu', description: 'Menu Component', type: 'Flyout', default: '' },
    { property: 'menuBreakpoints', description: 'Menu Component breakpoints', type: 'object', default: '{ xs: 0, md: 13, xl: 12, xxl: 13 }' },
    { property: 'menuPosition', description: <Fragment><Code>right</Code> or <Code>left</Code></Fragment>, type: 'string', default: 'left' },
    { property: 'menuProps', description: 'This props will be forwarded to Menu component', type: 'object', default: '{}' },
    { property: 'menuRoutes', description: 'Routes config', type: 'object[]', default: '' },
    { property: 'siderProps', description: <Fragment>This props will be forwarded to Sider component. If not set <Code>menuProps</Code> will be used</Fragment>, type: 'object', default: '' },
    { property: 'siderRoutes', description: <Fragment>Routes config. If not set <Code>menuRoutes</Code> will be used</Fragment>, type: 'object[]', default: '' },
    { property: 'version', description: 'Version', type: 'string', default: '' }
];

export default () => (
    <ComponentDisplay title={''} code={code} properties={properties}>
        <Example/>
    </ComponentDisplay>
);
