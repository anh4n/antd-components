import React, { Fragment } from 'react';
import { ComponentDisplay } from '../../components/ComponentDisplay';
import { Upload } from '../../../src/index';
import {Divider} from 'antd';

const defaultFileList = [
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

const action = 'https://garic.docker.local/upload/create';

// Example implementation
const Example = () => (
    <Fragment>
        <label>Image Upload</label><br />
        <Upload action={action} type='image' />
        <Divider dashed />
        <label>File Upload</label><br />
        <Upload action={action} />
        <Divider dashed />
        <label>Upload Multiple Images</label><br />
        <Upload type='image' action={action} multiple>Upload Images</Upload>
        <Divider dashed />
        <label>Whitelisted file types with default data</label><br />
        <Upload
            type={{image: ['jpeg', 'png']}}
            defaultFileList={defaultFileList}
            multiple
            action={action}
            onUploaded={onUploaded}
            customRequestData={{
                whatever: 'extra data you want to pass'
            }}
        >
            Upload Images
        </Upload>
    </Fragment>
);

// Code example
// language=JS
const code = `
    import React, {Fragment} from 'react';
    import { Upload } from '@react-hangar/antd-components';

    const defaultFileList = [
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

    const Example = () => {
    
        const action = '/path/upload';
    
        return (
           <Fragment>
                <Upload type='image' action={action} />
                <Upload type='file' action={action} />                        
                <Upload type='image' action={action} multiple>Upload Images</Upload>
                <Upload 
                    type={{image: ['jpeg', 'png']}} 
                    defaultFileList={defaultFileList}
                    action={action}
                    onUploaded={onUploaded}
                    multiple
                    customRequestData={{
                        whatever: 'extra data you want to pass'
                    }}               
                >
                    Upload Images
                </Upload>
           </Fragment>
        );
    };

    export default Example;
`;

// Component props
const properties = [
    {property: 'type', description: "'file', 'image' | {image: ['jpeg', 'png']}, {file: ['txt', 'dll']}", type: 'string | array[object]'},
    {property: 'defaultFileList', description: 'sets default values', type: 'array'},
    {property: 'customRequestData', description: '(optional) passes custom data to request', type: 'object'},
    {property: 'action', description: 'api url e.g. /path/upload', type: 'string'},
    {property: 'multiple', description: 'for uploading multiple files or images', type: 'string'},
    {property: 'onUploaded', description: 'function that returns response after upload', type: 'function'},
    {property: '(Inherited)', description: 'Ant design properties are inherited (see: https://ant.design/components/upload/)'},
];

export default () => (
    <Fragment>
        <ComponentDisplay title={'Files / Images'} code={code} properties={properties}>
            <Example/>
        </ComponentDisplay>
    </Fragment>
);
