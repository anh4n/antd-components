import React, { Fragment } from 'react';
import { ComponentDisplay } from '../../components/ComponentDisplay';
import { Form, SaveButton, FormItem } from '../../../src';
import { Input, message } from 'antd';
import faker from 'faker';
import { Code, generateImages } from '../../components/utils';
import nanoid from 'nanoid';

const generateOption = () => {
    const v = faker.commerce.productMaterial();

    return ({
        label: v,
        value: nanoid()
    });
};

const options = [
    generateOption(),
    generateOption(),
    generateOption()
];

const generateFakeData = () => ({
    _id: nanoid(10),
    company: faker.company.companyName(),
    product: faker.commerce.productName(),
    image: generateImages()
});


// Example implementation
const Example = () => {
    const action = 'http://www.mocky.io/v2/5daf53d53200006d00d961e1';

    const onUploaded = (response) => {
        console.log(response);
    };

    const handleSubmit = (data, form) => {
        message.success('valid form');
        console.log(data);
    };

    return (
        <Form onSubmit={handleSubmit} record={generateFakeData()}>
            <FormItem label='Company Name' dataIndex={'company'} required>
                <Input/>
            </FormItem>
            <FormItem fieldType={'string'} label='Product Name' dataIndex={'product'} required/>
            <FormItem fieldType={'string'} label='Text with Validator' dataIndex={'text'} rules={[{ max: 10 }]}/>
            <FormItem fieldType={'select'} label='Material' dataIndex={'material'} fieldProps={{ options }} required/>
            <FormItem fieldType={'image'} dataIndex={'image'} label={'Upload Form Item'} required fieldProps={{
                type: { image: ['jpeg', 'png'] },
                action,
                onUploaded,
                multiple: true,
                customRequestData: {
                    whatever: 'extra data you want to pass'
                }
            }}/>
            <SaveButton htmlType="submit"/>
        </Form>
    );
};


// Code example
// language=JS
const code = `
    import React from 'react';
    import { Input, message } from 'antd';
    import { Form, FormItem, SaveButton } from '@react-hangar/antd-components';

    const Example = () => {

        const options = [
            {label: 'A', value: 'a'},
            {label: 'B', value: 'b'},
            {label: 'C', value: 'c'}
        ];

        const fileList = [
            {
                name: 'xxx.png',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
                name: 'yyy.png',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
        ];

        const onUploaded = (response) => {
            console.log(response);
        };

        const handleSubmit = (data, form) => {
            message.success('valid form');
            console.log(data);
        };

        return (
            <Form onSubmit={handleSubmit} company={'Lindgren - Yundt'} product={'Unbranded Soft Chips'}
                  image={fileList}>
                <FormItem label='Company Name' dataIndex={'company'} required>
                    <Input/>
                </FormItem>
                <FormItem fieldType={'string'} label='Product Name' dataIndex={'product'} required/>
                <FormItem fieldType={'string'} label='Text with Validator' dataIndex={'text'} rules={[{ max: 10 }]}/>
                <FormItem fieldType={'select'} label='Material' dataIndex={'material'} fieldProps={{ options }} required/>
                <FormItem fieldType={'image'} dataIndex={'image'} label={'Upload Form Item'} required fieldProps={{
                    type: { image: ['jpeg', 'png'] },
                    action: '/path/upload',
                    onUploaded,
                    multiple: true,
                    customRequestData: {
                        whatever: 'extra data you want to pass'
                    }
                }}/>
                <SaveButton htmlType="submit"/>
            </Form>
        );
    };

    export default Example;
`;

// Component props
const properties = [
    {
        property: 'disableSaveButtonOnError',
        description: 'Save button will be disabled if form is invalid',
        type: 'bool'
    }, {
        property: 'record',
        description: 'Data record',
        type: 'object'
    }, {
        property: 'onSubmit',
        description: 'Callback function if form is submited and valid',
        type: 'function'
    },
];
const formItemProperties = [
    {
        property: 'dataIndex',
        description: 'Name of record property',
        type: 'string'
    }, {
        property: 'fieldProps',
        description: 'This props will be forwarded to input component',
        type: 'object',
        default: '{}'
    }, {
        property: 'fieldType',
        description:
            <span>Can be one of <Code>boolean</Code><Code>image</Code><Code>html</Code><Code>object</Code><Code>list</Code><Code>number</Code><Code>string</Code></span>,
        type: 'string',
        default: 'string'
    }, {
        property: 'form',
        description: <span>The form createtd by <Code>Form.create()</Code></span>,
        type: 'object'
    }, {
        property: 'initialValue',
        description: 'You can specify initial value, type, optional value of children node',
        type: 'string|number|bool|object|array'
    }, {
        property: 'required',
        description: 'Add required validator',
        type: 'bool',
        default: 'false'
    }, {
        property: 'rules',
        description: 'Includes validation rules. Please refer to "Validation Rules" part for details',
        type: 'object[]',
        default: '[]'
    }, {
        property: 'title',
        description: 'Label text',
        type: 'string'
    }, {
        property: 'valuePropName',
        description: 'Props of children node, for example, the prop of Switch is \'checked\'',
        type: 'string'
    }
];

const withFormProperties = [
    {
        property: 'mapProps',
        description: 'Maps record prop on component to form fields',
        type: 'bool',
        default: 'false'
    }
];

export default () => (
    <Fragment>
        <ComponentDisplay title={'Form'} code={code} properties={properties}>
            <Example/>
        </ComponentDisplay>
        <ComponentDisplay title={'FormItem'} properties={formItemProperties}/>
        <ComponentDisplay
            title={'withForm(Component, config)'}
            properties={withFormProperties}
            description={
                <span>This is a better <Code>Form.create()</Code> with automatic validation localisation</span>}
        />
    </Fragment>
);
