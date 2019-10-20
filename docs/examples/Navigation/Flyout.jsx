import React from 'react';
import { ComponentDisplay } from '../../components/ComponentDisplay';
import { Flyout } from '../../../src';

// Example implementation
const Example = () => {
    const routes = [
        {
            key: 'flyout-home',
            label: 'Home',
            icon: 'home',
            path: '/Navigation/Flyout/Home',
            submenu: [
                {
                    key: '11',
                    label: 'Submenu',
                    icon: 'usb',
                    path: '/Submenu',
                    submenu: [
                        {
                            key: '111',
                            label: 'Sub-Submenu',
                            path: '/1',
                            submenu: [
                                {
                                    key: '1111',
                                    label: 'Sub-Sub-Submenu',
                                    path: '/1',
                                }
                            ]
                        }
                    ]
                },
                {
                    key: '12',
                    label: 'Highlights',
                    icon: 'highlight',
                    path: '/Highlights',
                },
                {
                    key: '13',
                    label: 'Products',
                    group: [
                        {
                            key: '131',
                            label: 'Product 1',
                            path: '/Product1',
                        },
                        {
                            key: '132',
                            label: 'Product 2',
                            path: '/Product2',
                        }
                    ]
                }
            ]
        },
        {
            key: 'flyout-contact',
            label: 'Contact',
            icon: 'contacts',
            path: '/Navigation/Flyout/Contact',
            submenu: [
                {
                    key: '21',
                    label: 'Person 1',
                    path: '/Person1',

                },
                {
                    key: '22',
                    label: 'Person 2',
                    path: '/Person2',
                }
            ]
        },
        {
            key: 'flyout-about',
            label: 'About Us',
            path: '/Navigation/Flyout/About-Us',
        },
        {
            key: 'flyout-hidden',
            label: 'I am hidden',
            path: '/Navigation/Flyout/Hidden',
            hideInMenu: true
        }
    ];

    return (
        <Flyout routes={routes} openSubmenus='selected'/>
    );
};

// Code example
// language=JS
const code = `
    import React from 'react';
    import { Flyout } from '@react-hangar/antd-components';

    const routes = [
        {
            key: 'flyout-home',
            label: 'Home',
            icon: 'home',
            path: '/Navigation/Flyout/Home',
            submenu: [
                {
                    key: '11',
                    label: 'Submenu',
                    icon: 'usb',
                    path: '/Submenu',
                    submenu: [
                        {
                            key: '111',
                            label: 'Sub-Submenu',
                            path: '/1',
                            submenu: [
                                {
                                    key: '1111',
                                    label: 'Sub-Sub-Submenu',
                                    path: '/1',
                                }
                            ]
                        }
                    ]
                },
                {
                    key: '12',
                    label: 'Highlights',
                    icon: 'highlight',
                    path: '/Highlights',
                },
                {
                    key: '13',
                    label: 'Products',
                    group: [
                        {
                            key: '131',
                            label: 'Product 1',
                            path: '/Product1',
                        },
                        {
                            key: '132',
                            label: 'Product 2',
                            path: '/Product2',
                        }
                    ]
                }
            ]
        },
        {
            key: 'flyout-contact',
            label: 'Contact',
            icon: 'contacts',
            path: '/Navigation/Flyout/Contact',
            submenu: [
                {
                    key: '21',
                    label: 'Person 1',
                    path: '/Person1',

                },
                {
                    key: '22',
                    label: 'Person 2',
                    path: '/Person2',
                }
            ]
        },
        {
            key: 'flyout-about',
            label: 'About Us',
            path: '/Navigation/Flyout/About-Us',
        },
        {
            key: 'flyout-hidden',
            label: 'I am hidden',
            path: '/Navigation/Flyout/Hidden',
            hideInMenu: true
        }
    ];

    export default Example;

`;

// Component props
const properties = [
    { property: 'routes', description: 'routes config', type: 'object[]', default: '[]' },
    {
        property: 'openSubmenus',
        description: 'open submenu items; "all" and "selected" are supported',
        type: 'string'
    }
];

export default () => (
    <ComponentDisplay title={'Flyout'} code={code} properties={properties}>
        <Example/>
    </ComponentDisplay>
);
