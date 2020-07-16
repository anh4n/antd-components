import React, { Fragment } from 'react';
import { ComponentDisplay } from '../../components/ComponentDisplay';
import { Login } from '../../../src';
import { Card, message } from 'antd';

// Example implementation
const Example = () => {

    const handleSubmit = (data, form) => {
        message.success('valid form');
        console.log(data);
    };

    return (
        <Card title={'Login'} style={{maxWidth: 460}}>
            <Login
                showRememberMe
                forgotPasswordUrl={'/forgot-password'}
                registerUrl={'/register'}
            />
        </Card>
    );
};

// Code example
// language=JS
const code = `
    import React from 'react';
    import { message } from 'antd';
    import { Login } from '@react-hangar/antd-components';

    const Example = () => {

        const handleSubmit = (data, form) => {
            message.success('valid form');
            console.log(data);
        };

        return (
            <Card title={'Login'}>
                <Login onSubmit={handleSubmit}
                    showRememberMe
                    forgotPasswordUrl={'/forgot-password'}
                    registerUrl={'/register'}
                />
            </Card>
        );
    };

    export default Example;
`;

// Component props
const properties = [
    {
        property: 'onSubmit',
        description: 'Callback function if form is submited and valid',
        type: 'function'
    },{
        property: 'showRememberMe',
        description: 'Show remember me checkbox',
        type: 'boolean',
        default: 'false'
    },{
        property: 'registerUrl',
        description: 'shows registration link if url provided',
        type: 'string'
    },{
        property: 'forgotPasswordUrl',
        description: 'shows forgot password link if url provided',
        type: 'string'
    },
];

export default () => (
    <Fragment>
        <ComponentDisplay title={'Form'} code={code} properties={properties}>
            <Example/>
        </ComponentDisplay>
    </Fragment>
);
