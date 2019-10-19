import React from 'react';
import { ComponentDisplay } from '../../components/ComponentDisplay';
import { Editor } from '../../../src';

// Example implementation
const Example = () => {
    return (
        <Editor/>
    );
};

// Code example
// language=JS
const code = `
    import React from 'react';
    import { Form } from 'antd';
    import { DynamicFormItem } from '@react-hangar/antd-components';

    const Example = () => {
        return (
            <Editor/>
        );
    };

    export default Example;

`;

// Component props
const properties = [

];

export default () => (
    <ComponentDisplay title={'Editor'} code={code} properties={properties}>
        <Example/>
    </ComponentDisplay>
);
