import React from 'react';
import Switch from 'antd/lib/switch';
import Popover from 'antd/lib/popover';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import { Editor, CodeMirror } from '../../src';

export const getDisplay = (fieldType, record, dataIndex, children, maxLength) => {
    if (fieldType === 'boolean') {
        return <Switch disabled={true} checked={record}/>
    }

    if (fieldType === 'object') {
        const content = (
            <pre className="language-bash">
                {JSON.stringify(record, null, 2)}
            </pre>
        );

        return (
            <Popover content={content} title={dataIndex}>
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                    object
                </span>
            </Popover>
        );
    }

    if (fieldType === 'html') {
        const content = (
            <pre className="language-bash">
                <div dangerouslySetInnerHTML={{ __html: record }}/>
            </pre>
        );

        return (
            <Popover content={content} title={dataIndex}>
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                    html
                </span>
            </Popover>);
    }

    if (fieldType === 'image') {
        return (
            <Popover content={<img height={150} src={record.url}/>} title={record.name}>
                <span style={{ cursor: 'pointer' }}>
                    <img height={40} src={record.url}/>
                </span>
            </Popover>
        );
    }

    if (fieldType === 'string') {
        if (record.length > maxLength) {
            return record.substring(0, maxLength) + '...';
        }
    }

    return children;
};

export const renderForm = (props, columns) => {
    const { getFieldDecorator } = props.form;

    return React.Children.map(columns, child => {
        const { title, dataIndex, fieldType } = child.props;

        switch (fieldType) {
            case 'string':
                return (
                    <Form.Item label={title}>
                        {getFieldDecorator(dataIndex)(<Input/>)}
                    </Form.Item>
                );
            case 'boolean':
                return (
                    <Form.Item label={title}>
                        {getFieldDecorator(dataIndex, { valuePropName: 'checked' })(<Switch/>)}
                    </Form.Item>
                );
            case 'html':
                return (
                    <Form.Item label={title}>
                        {getFieldDecorator(dataIndex)(<Editor/>)}
                    </Form.Item>
                );
            case 'object':
                return (
                    <Form.Item label={title}>
                        {getFieldDecorator(dataIndex)(<CodeMirror/>)}
                    </Form.Item>
                );
            default:
                return (
                    <Form.Item label={title}>
                        {getFieldDecorator(dataIndex)(<Input/>)}
                    </Form.Item>
                );
        }
    });
};
