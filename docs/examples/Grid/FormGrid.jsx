import React, { Fragment, useState } from 'react';
import faker from 'faker';
import { message } from 'antd';
import { ComponentDisplay } from '../../components/ComponentDisplay';
import { FormGrid, Column, FormItem } from '../../../src';
import nanoid from 'nanoid';
import {
    Code,
    generateFakeDataArray,
    generateFakeList,
    generateFakeObject,
    generateImages
} from '../../components/utils';
import { PureArray } from '@root/array';

const generateFakeData = () => ({
    _id: nanoid(10),
    salutation: faker.helpers.randomize(['mr', 'mrs']),
    text: faker.commerce.productName(),
    html: `<span style="color: ${faker.internet.color()}">${faker.lorem.words()}</span>`,
    image: generateImages(),
    settings: generateFakeObject(),
    list: generateFakeList(),
    active: faker.random.boolean(),
    tree: [
        {
            key: 'side-contact',
            label: 'Contact',
            icon: 'contacts',
            path: '/Navigation/Side/Contact',
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
        }
    ]
});

const options = [
    {label: 'Mr', value: 'mr'},
    {label: 'Mrs', value: 'mrs'}
];

const defaultData = generateFakeDataArray(5, generateFakeData);

const Example = () => {
    const [data, setData] = useState(defaultData);

    let form = {};

    const onAdd = () => {
        return {
            text: faker.random.word()
        };
    };

    const onEdit = (id) => {
        message.info(`edit button on row "${id}" clicked!`);
    };

    const onDelete = (ids) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                setData(data.filter(rec => !ids.includes(rec._id)));
                resolve();
            }, 2000);
        });
    };

    const onSave = (record) => {
        const index = data.findIndex(rec => rec._id === record._id);
        let newData;

        if (index === -1) {
            newData = PureArray.insert(data, record, index);
        } else {
            newData = PureArray.update(data, ['_id', record._id], record);
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                setData(newData);
                resolve();
            }, 2000);
        });
    };

    const onSelect = (e) => {
        form.setFieldsValue({material: e});
    };

    const onAfterRenderForm = (e) => {
        form = e
    };

    const imageConfig = {
        action: 'http://www.mocky.io/v2/5daf53d53200006d00d961e1',
        type: {image: ['jpeg', 'png']}
    };

    const treeConfig = {
        draggable: true,
        editable: true,
        formItems: [<FormItem key={3} fieldType={'string'} label='Component' dataIndex={'component'} required/>],
        defaultExpandAll: true
    };

    return (
        <FormGrid
            dataSource={data}
            pagination={false}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
            onSave={onSave}
            idProperty={'_id'}
            onAfterRenderForm={onAfterRenderForm}
        >
            <Column title={'Salutation'} dataIndex={'salutation'} fieldType={'select'}
                    fieldProps={{options, onSelect: onSelect}} required/>
            <Column title={'Title'} dataIndex={'text'} fieldType={'string'} required maxLength={30}/>
            <Column title={'Content'} dataIndex={'html'} fieldType={'html'} required/>
            <Column title={'Image'} dataIndex={'image'} fieldType={'image'} fieldProps={imageConfig}/>
            <Column title={'Settings'} dataIndex={'settings'} fieldType={'object'} required/>
            <Column title={'List'} dataIndex={'list'} fieldType={'list'}/>
            <Column title={'Tree'} dataIndex={'tree'} fieldType={'tree'} fieldProps={treeConfig}/>
            <Column title={'Active'} dataIndex={'active'} fieldType={'boolean'}/>
        </FormGrid>
    );
};

// Code example
// language=JS
const code = `
    import React, { useState } from 'react';
    import { FormGrid, Column, FormItem } from '@react-hangar/antd-components'

    const options = [
        {label: 'Mr', value: 'mr'},
        {label: 'Mrs', value: 'mrs'}
    ];

    const defaultData = [
        {
            _id: 1,
            text: 'You can adjust types',
            html: '<div style="background-color: #eee; color: #D20000">this is renderd html</div>',
            image: [
                {
                    name: 'write.jpg',
                    url: 'https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593357_960_720.jpg'
                },
                {
                    name: 'note.jpg',
                    url: 'https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_960_720.jpg'
                }],
            settings: {
                lame: false,
                nasty: 'yes'
            },
            list: [
                'foo',
                'bar',
                'test'
            ],
            tree: [
                {
                    key: 'side-contact',
                    label: 'Contact',
                    icon: 'contacts',
                    path: '/Navigation/Side/Contact',
                    submenu: [
                        {
                            key: '21',
                            label: 'Person 1',
                            path: '/Person1',
                            submenu: []

                        },
                        {
                            key: '22',
                            label: 'Person 2',
                            path: '/Person2',
                            submenu: []
                        }
                    ]
                }
            ],
            active: true
        },
        {
            _id: 2,
            text: 'for example string',
            html: '<div style="background-color: #000; color: #fff">this is renderd html</div>',
            image: {
                name: 'note.jpg',
                url: 'https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_960_720.jpg'
            },
            settings: {
                dope: true,
                crazy: 'yes'
            },
            list: [
                'foo 2',
                'bar 2',
                'test 2'
            ],
            tree: [
                {
                    key: 'side-contact',
                    label: 'Contact',
                    icon: 'contacts',
                    path: '/Navigation/Side/Contact',
                    submenu: [
                        {
                            key: '21',
                            label: 'Person 1',
                            path: '/Person1',
                            submenu: []

                        },
                        {
                            key: '22',
                            label: 'Person 2',
                            path: '/Person2',
                            submenu: []
                        }
                    ]
                }
            ],
            active: true
        },
        {
            _id: 3,
            text: 'it will be shortened if its to long',
            html: '<div style="background-color: #fff; color: #000">this is renderd html</div>',
            image: {
                name: 'working.jpg',
                url: 'https://cdn.pixabay.com/photo/2015/07/17/22/42/startup-849805_960_720.jpg'
            },
            settings: {
                amazing: true,
                fancy: 'yes'
            },
            list: [
                'foo 3',
                'bar 3',
                'test 3'
            ],
            tree: [
                {
                    key: 'side-contact',
                    label: 'Contact',
                    icon: 'contacts',
                    path: '/Navigation/Side/Contact',
                    submenu: [
                        {
                            key: '21',
                            label: 'Person 1',
                            path: '/Person1',
                            submenu: []

                        },
                        {
                            key: '22',
                            label: 'Person 2',
                            path: '/Person2',
                            submenu: []
                        }
                    ]
                }
            ],
            active: false
        }
    ];

    const Example = () => {

        const [data, setData] = useState(defaultData);
        const [recordId, setRecordId] = useState();

        let form = {};

        const onAdd = () => {
            return {
                text: faker.random.word()
            };
        };

        const onEdit = (id) => {
            setRecordId(id);
        };

        const onDelete = (ids) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    setData(data.filter(rec => !ids.includes(rec.id)));
                    resolve();
                }, 2000);
            });
        };

        const onSave = (record) => {
            const index = data.findIndex(rec => rec._id === record._id);

            if (index === -1) {
                data.push(record);
            } else {
                data[index] = record;
            }

            return new Promise((resolve) => {
                setTimeout(() => {
                    setData(data);
                    resolve();
                }, 2000);
            });
        };

        const onDeleteTree = (id, tree) => {
            let records = data.map((record) => {
                if (record._id === recordId) {
                    record.tree = tree;
                    return record;
                }
                return record;
            });

            setData(records);
        };

        const onSaveTree = (node, tree) => {
            let records = data.map((record) => {
                if (record._id === recordId) {
                    record.tree = tree;
                    return record;
                }
                return record;
            });

            setData(records);
        };

        const onDropTree = (sourceKey, targetKey, tree) => {
            let records = data.map((record) => {
                if (record._id === recordId) {
                    record.tree = tree;
                    return record;
                }
                return record;
            });

            setData(records);
        };

        const onSelect = (e) => {
            form.setFieldsValue({material: e});
        };

        const onAfterRenderForm = (e) => {
            form = e
        };

        const imageConfig = {
            action: 'http://www.mocky.io/v2/5daf53d53200006d00d961e1',
            type: {image: ['jpeg', 'png']}
        };

        const treeConfig = {
            tree: treeData,
            draggable: true,
            editable: true,
            formItems: [<FormItem key={3} fieldType={'string'} label='Component' dataIndex={'component'} required/>],
            defaultExpandAll: true,
            onDelete: onDeleteTree,
            onSave: onSaveTree,
            onDrop: onDropTree
        };

        return (
            <FormGrid
                dataSource={data}
                pagination={false}
                onDelete={onDelete}
                onSave={onSave}
                idProperty={'_id'}
                onAfterRenderForm={onAfterRenderForm}
            >
                <Column title={'Salutation'} dataIndex={'salutation'} fieldType={'select'}
                        fieldProps={{options, onSelect: onSelect}}
                        required/>
                <Column title={'Title'} dataIndex={'text'} fieldType={'string'} required maxLength={30}/>
                <Column title={'Content'} dataIndex={'html'} fieldType={'html'} required/>
                <Column title={'Image'} dataIndex={'image'} fieldType={'image'} fieldProps={imageConfig}/>
                <Column title={'Settings'} dataIndex={'settings'} fieldType={'object'} required/>
                <Column title={'List'} dataIndex={'list'} fieldType={'list'}/>
                <Column title={'Tree'} dataIndex={'tree'} fieldType={'tree'} fieldProps={treeConfig}/>
                <Column title={'Active'} dataIndex={'active'} fieldType={'boolean'}/>
            </FormGrid>
        );
    };

    export default Example;
`;

const columnProperties = [
    {property: 'dataIndex', description: 'Name of record property', type: 'string'},
    {
        property: 'fieldProps',
        description: 'This props will be forwarded to input component',
        type: 'object',
        default: '{}'
    },
    {
        property: 'fieldType',
        description:
            <span>Can be one of <Code>boolean</Code><Code>image</Code><Code>html</Code><Code>object</Code><Code>list</Code><Code>number</Code><Code>string</Code></span>,
        type: '',
        default: 'string'
    },
    {
        property: 'hideInGrid',
        description: 'Hide column in grid but show it in editing form',
        type: 'bool',
        default: 'false'
    },
    {
        property: 'maxLength',
        description: 'text is cut off after given number of chars (only for string field)',
        type: 'number'
    },
    {property: 'required', description: 'set field as required', type: 'bool', default: 'false'},
    {
        property: 'onAfterRenderForm',
        description: 'returns form after render the form has been rendered.',
        type: 'function'
    },
    {
        property: 'rules',
        description: 'Add validation rules (see: https://ant.design/components/form/#Validation-Rules)',
        type: 'array',
        default: '[]'
    },
];

// Component props
const properties = [
    {property: 'dataSource', description: 'data source', type: 'object[]'},
    {property: 'idProperty', description: 'id field property of data source', type: 'string', default: 'id'},
    {property: 'onAdd', description: 'Function is called on record add', type: 'function'},
    {property: 'onDelete', description: 'Function is called on record delete', type: 'function'},
    {property: 'onEdit', description: 'Function is called on record edit', type: 'function'},
    {property: 'onSave', description: 'Function is called on record save', type: 'function'}
];

export default () => (
    <Fragment>
        <ComponentDisplay title={'Form Grid'} code={code} properties={properties}>
            <Example/>
        </ComponentDisplay>
        <ComponentDisplay title={'Column'} properties={columnProperties}/>
    </Fragment>
);
