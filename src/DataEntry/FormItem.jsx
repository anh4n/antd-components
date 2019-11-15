import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, Switch } from 'antd';
import { Upload, Editor, CodeMirror, ListField, Select } from '..';

const getInput = (fieldType, fieldProps = {}) => {
    switch (fieldType) {
        case 'boolean':
            return (<Switch/>);
        case 'image':
            return (<Upload {...fieldProps} />);
        case 'html':
            return (<Editor/>);
        case 'object':
            return (<CodeMirror/>);
        case 'list':
            return (<ListField/>);
        case 'number':
            return (<InputNumber/>);
        case 'select':
            return (<Select {...fieldProps}/>);
        case 'string':
        default:
            return (<Input/>);
    }
};

const getValuePropName = (fieldType) => {
    switch (fieldType) {
        case 'boolean':
            return 'checked';
        case 'image':
            return 'fileList';
        default:
            return 'value';
    }
};

/**
 * @return {React.Component}
 *
 * @constructor
 */
export const FormItem = (props) => {
    const { fieldType, fieldProps, title, dataIndex, form, valuePropName, required, initialValue, children, ...restProps } = props;
    const { getFieldDecorator, isFieldTouched, getFieldError } = form;
    const rules = [
        { required },
        ...props.rules
    ];

    const validateStatus = isFieldTouched(dataIndex) && getFieldError(dataIndex);

    return (
        <Form.Item
            label={title}
            validateStatus={validateStatus ? 'error' : ''}
            help={validateStatus || ''}
            {...restProps}
        >
            {
                getFieldDecorator(
                    dataIndex,
                    {
                        initialValue,
                        valuePropName: valuePropName || getValuePropName(fieldType),
                        rules
                    }
                )(
                    children || getInput(fieldType, fieldProps)
                )
            }
        </Form.Item>
    );
};

FormItem.defaultProps = {
    fieldProps: {},
    fieldType: 'string',
    required: false,
    rules: []
};

FormItem.propTypes = {
    dataIndex: PropTypes.string.isRequired,
    fieldProps: PropTypes.object,
    fieldType: PropTypes.oneOf(['boolean', 'image', 'html', 'object', 'list', 'number', 'string', 'select']),
    form: PropTypes.object,
    initialValue: PropTypes.any,
    required: PropTypes.bool,
    rules: PropTypes.array,
    title: PropTypes.string,
    valuePropName: PropTypes.string
};

FormItem.displayName = 'FormItem';

