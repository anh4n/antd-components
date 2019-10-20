import React, { useState } from 'react';
import { ComponentDisplay } from '../../components/ComponentDisplay';
import { CodeMirror } from '../../../src';

// Example implementation
const Example = () => {
    const [value, setValue] = useState({
        lame: false,
        nasty: 'yes'
    });

    return (
        <CodeMirror value={value} onChange={v => setValue(v)} />
    );
};

// Code example
// language=JS
const code = `
    import React from 'react';
    import { CodeMirror } from '@react-hangar/antd-components';

    const Example = () => {
        const [value, setValue] = useState({
            lame: false,
            nasty: 'yes'
        });

        return (
            <CodeMirror value={value} onChange={v => setValue(v)} />
        );
    };

    export default Example;

`;

// Component props
const properties = [
    {property: 'onChange', description: 'onChange event', type: 'function'},
    {property: 'lineNumbers', description: 'Whether to show line numbers to the left of the editor.', type: 'bool', default: 'true'},
    {property: 'indentUnit', description: 'How many spaces a block should be indented', type: 'number', default: '4'},
    {property: 'lineSeparator', description: 'Explicitly set the line separator for the editor', type: 'string', default: '\\n'},
];

export default () => (
    <ComponentDisplay title={'CodeMirror'} code={code} properties={properties}>
        <Example/>
    </ComponentDisplay>
);
