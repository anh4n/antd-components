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
    import { Editor } from '@react-hangar/antd-components';

    const Example = () => {
        return (
            <Editor/>
        );
    };

    export default Example;

`;

// Component props
const properties = [
    {property: 'height', description: 'https://www.tiny.cloud/docs/configure/editor-appearance/#height', type: 'number/string', default: '500'},
    {property: 'menubar', description: 'https://www.tiny.cloud/docs/configure/editor-appearance/#menubar', type: 'string/boolean', default: 'false'},
    {property: 'plugins', description: 'https://www.tiny.cloud/docs/configure/integration-and-setup/#plugins', type: 'string/string[]', default: ''},
    {property: 'toolbar', description: 'https://www.tiny.cloud/docs/configure/editor-appearance/#toolbar', type: 'string', default: ''}
];

export default () => (
    <ComponentDisplay title={'Editor'} code={code} properties={properties}>
        <pre>
            {`You have to include this line of code in the <head> of your HTML page:
<script src="dist/tinymce/tinymce.min.js"></script>`}
        </pre>
        <Example/>
    </ComponentDisplay>
);
