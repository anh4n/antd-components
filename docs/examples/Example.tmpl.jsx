// Template File for Components Examples
import React from 'react';
import { ComponentDisplay } from '../../components/ComponentDisplay';
import { Component } from '../../../src';

// Example implementation
const Example = () => {
    return (
        <Component/>
    );
};

// Code example
// language=JS
const code = `
    import React from 'react';
    import { Component } from '@react-hangar/antd-components';

    const Example = () => {
        return (
            <Component/>
        );
    };

    export default Example;

`;

// Component props
const properties = [
    {property: '', description: '', type: '', default: ''},
];

export default () => (
    <ComponentDisplay title={''} code={code} properties={properties}>
        <Example/>
    </ComponentDisplay>
);
