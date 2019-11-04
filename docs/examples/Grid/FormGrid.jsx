import React, { useState } from 'react';
import faker from 'faker';
import { message } from 'antd';
import { ComponentDisplay } from '../../components/ComponentDisplay';
import { FormGrid, Column } from '../../../src';
import nanoid from 'nanoid';
import { generateFakeDataArray, generateFakeList, generateFakeObject } from '../../components/utils';

const generateImages = () => {
    const len = faker.random.number({ min: 1, max: 5 });
    return generateFakeDataArray(len, () => ({
        name: faker.system.commonFileName(),
        url: `http://picsum.photos/seed/${faker.lorem.word()}/225/150`
    }));
};

const generateFakeData = () => ({
    _id: nanoid(10),
    text: faker.commerce.productName(),
    html: `<div style="color: ${faker.internet.color()}">${faker.lorem.words()}</div>`,
    image: generateImages(),
    settings: generateFakeObject(),
    list: generateFakeList(),
    active: faker.random.boolean()
});

const defaultData = generateFakeDataArray(5, generateFakeData);

const Example = () => {
    const [data, setData] = useState(defaultData);

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

    const imageConfig = {
        action: 'http://www.mocky.io/v2/5daf53d53200006d00d961e1',
        type: { image: ['jpeg', 'png'] }
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
        >
            <Column title={'Title'} dataIndex={'text'} fieldType={'string'} required maxLength={30}/>
            <Column title={'Content'} dataIndex={'html'} fieldType={'html'} required/>
            <Column title={'Image'} dataIndex={'image'} fieldType={'image'} fieldProps={imageConfig}/>
            <Column title={'Settings'} dataIndex={'settings'} fieldType={'object'} required/>
            <Column title={'List'} dataIndex={'list'} fieldType={'list'}/>
            <Column title={'Active'} dataIndex={'active'} fieldType={'boolean'}/>
        </FormGrid>
    );
};

// Code example
// language=JS
const code = `
    import React, { useState } from 'react';
    import { FormGrid, Column } from '@react-hangar/antd-components'

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
            active: false
        }
    ];

    const Example = () => {

        const [data, setData] = useState(defaultData);

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

        const imageConfig = {
            action: 'http://www.mocky.io/v2/5daf53d53200006d00d961e1',
            type: { image: ['jpeg', 'png'] }
        };

        return (
            <FormGrid
                dataSource={data}
                pagination={false}
                onDelete={onDelete}
                onSave={onSave}
                idProperty={'_id'}
            >
                <Column title={'Title'} dataIndex={'text'} fieldType={'string'} required maxLength={30}/>
                <Column title={'Content'} dataIndex={'html'} fieldType={'html'} required/>
                <Column title={'Image'} dataIndex={'image'} fieldType={'image'} fieldProps={imageConfig}/>
                <Column title={'Settings'} dataIndex={'settings'} fieldType={'object'} required/>
                <Column title={'List'} dataIndex={'list'} fieldType={'list'}/>
                <Column title={'Active'} dataIndex={'active'} fieldType={'boolean'}/>
            </FormGrid>
        );
    };

    export default Example;
`;

// Component props
const properties = [
    { property: 'dataSource', description: 'data source', type: 'object[]' },
    { property: 'idProperty', description: 'id field property of data source', type: 'string', default: 'id' },
    { property: 'onAdd', description: 'Function is called on record add', type: 'function' },
    { property: 'onDelete', description: 'Function is called on record delete', type: 'function' },
    { property: 'onEdit', description: 'Function is called on record edit', type: 'function' },
    { property: 'onSave', description: 'Function is called on record save', type: 'function' }
];

export default () => (
    <ComponentDisplay title={'Form Grid'} code={code} properties={properties}>
        <Example/>
    </ComponentDisplay>
);
