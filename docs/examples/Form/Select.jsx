import React, { Fragment } from 'react';
import { ComponentDisplay } from '../../components/ComponentDisplay';
import { Select } from '../../../src';
import faker from 'faker';

const generateOption = () => {
    const label = faker.commerce.productName();
    const value = faker.random.number();

    return ({
        label,
        value
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
                    style={{ marginBottom: '15px' }}
                    options={options}
                    placeholder={'--- Please Select ---'}
                    onChange={v => console.log(v)}
                />
            </div>
            <div>
                <Select
                    showSearch
                    style={{ marginBottom: '15px' }}
                    value={options[1].value}
                    options={options}
                    onChange={v => console.log(v)}
                    render={(label, value) =>
                        <Fragment>
                            <small>Label: </small>{label}<small> | Value: </small>{value}
                        </Fragment>
                    }
                />
            </div>
        </Fragment>
    );
};

// Code example
// language=JS
const code = `
    import React, { Fragment } from 'react';
    import { Select } from '@react-hangar/antd-components';

    const options = [
        { label: 'Unbranded Metal Keyboard', value: 1 },
        { label: 'Small Soft Table', value: 2 },
        { label: 'Ergonomic Concrete Mouse', value: 3 },
        {
            group: {
                label: 'Group1',
                options: [
                    { label: 'Incredible Steel Sausages', value: 4 },
                    { label: 'Sleek Granite Pants', value: 5 },
                    { label: 'Handmade Plastic Chicken', value: 6 },
                ]
            }
        }
    ];

    return (
        <Fragment>
            <div>
                <Select
                    style={{ marginBottom: '15px' }}
                    options={options}
                    placeholder={'--- Please Select ---'}
                    onChange={v => console.log(v)}
                />
            </div>
            <div>
                <Select
                    showSearch
                    style={{ marginBottom: '15px' }}
                    value={options[1].value}
                    options={options}
                    onChange={v => console.log(v)}
                    render={(label, value) =>
                        <Fragment>
                            <small>Label:</small>
                            {label}
                            <small>| Value:</small>
                            {value}
                        </Fragment>
                    }
                />
            </div>
        </Fragment>
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
