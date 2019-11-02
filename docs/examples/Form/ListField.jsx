import React, { useState } from 'react';
import { ComponentDisplay } from '../../components/ComponentDisplay';
import { ListField } from '../../../src';
import { generateFakeDataArray } from '../../components/utils';
import faker from 'faker';

const getFakeData = () => generateFakeDataArray(3, () => faker.name.findName());

// Example implementation
const Example = () => {
    const [value, setValue] = useState(getFakeData());

    return (
        <ListField
            value={value}
            onChange={v => setValue(v)}
        />
    );
};

// Code example
// language=JS
const code = `
    import React from 'react';
    import { ListField } from '@react-hangar/antd-components';

    const [value, setValue] = useState(getFakeData());

    return (
        <ListField
            value={value}
            onChange={v => setValue(v)}
        />
    );

    export default Example;

`;

// Component props
const properties = [
    { property: 'addText', description: 'Buttons text', type: 'string', default: 'Add field' }
];

export default () => (
    <ComponentDisplay title={'ListField'} code={code} properties={properties}>
        <Example/>
    </ComponentDisplay>
);
