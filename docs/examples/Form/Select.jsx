import React, { Fragment, useState } from 'react';
import { ComponentDisplay } from '../../components/ComponentDisplay';
import { Select } from '../../../src';
import faker from 'faker';

const generateOption = () => {
    const v = faker.commerce.productName();

    return ({
        label: v,
        value: v
    });
};

const options = [
    generateOption(),
    generateOption(),
    {
        group: {
            label: 'Group1',
            options: [
                generateOption(),
                generateOption(),
                generateOption()
            ]
        }
    },
    {
        group: {
            label: 'Group2',
            options: [
                generateOption(),
                generateOption(),
                generateOption()
            ]
        }
    },
    generateOption(),
    generateOption()
];

// Example implementation
const Example = () => {
    return (
        <Fragment>
            <div>
                <Select
                    style={{ marginBottom: '15px', width: '300px' }}
                    options={options}
                    placeholder={'--- Please Select ---'}
                />
            </div>
            <div>
                <Select
                    showSearch
                    style={{ marginBottom: '15px', width: '300px' }}
                    value={options[1].value}
                    options={options}
                />
            </div>
        </Fragment>
    );
};

// Code example
// language=JS
const code = `
    import React from 'react';
    import { Select } from '@react-hangar/antd-components';

    const [value, setValue] = useState(getFakeData());

    return (
        <Select
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
    <ComponentDisplay title={'Select'} code={code} properties={properties}>
        <Example/>
    </ComponentDisplay>
);
