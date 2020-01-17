import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Form, Input, InputNumber, Switch} from 'antd';
import { Upload, Editor, CodeMirror, ListField, Select } from '@root/DataEntry';
import {Tree} from '@root/Tree';

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
        case 'password':
            return (<Input.Password/>);
        case 'select':
            return (<Select style={{ width: '100%' }} {...fieldProps}/>);
        case 'checkbox':
            return (<Checkbox> {fieldProps.title} </Checkbox>);
        case 'tree':
            return (<Tree {...fieldProps} />);
        case 'string':
        default:
            return (<Input {...fieldProps}/>);
    }
};

const getValuePropName = (fieldType) => {
    switch (fieldType) {
        case 'boolean':
            return 'checked';
        case 'image':
            return 'fileList';
        case 'checkbox':
            return 'checked';
        case 'tree':
            return 'tree';
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
    const {
        fieldType,
        fieldProps,
        title,
        dataIndex,
        form,
        valuePropName,
        required,
        initialValue,
        disableInitialError,
        children,
        editable,
        hideInGrid,
        renderer,
        ...restProps
    } = props;

    const { getFieldDecorator, isFieldTouched, getFieldError } = form;

    const rules = [
        { required },
        ...props.rules
    ];

    let statusProps = {};

    if (disableInitialError) {
        const validateStatus = isFieldTouched(dataIndex) && getFieldError(dataIndex);
        statusProps = {
            validateStatus: validateStatus ? 'error' : '',
            help: validateStatus || ''
        };
    }

    return (
        <Form.Item
            label={title}
            {...statusProps}
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
    disableInitialError: false,
    fieldProps: {},
    fieldType: 'string',
    required: false,
    rules: []
};

FormItem.propTypes = {
    dataIndex: PropTypes.string.isRequired,
    disableInitialError: PropTypes.bool,
    fieldProps: PropTypes.object,
    fieldType: PropTypes.oneOf(['boolean', 'image', 'html', 'object', 'list', 'number', 'string', 'select', 'checkbox', 'password', 'tree']),
    form: PropTypes.object,
    initialValue: PropTypes.any,
    required: PropTypes.bool,
    rules: PropTypes.array,
    title: PropTypes.string,
    renderer: PropTypes.func,
    valuePropName: PropTypes.string,
};

FormItem.displayName = 'FormItem';
