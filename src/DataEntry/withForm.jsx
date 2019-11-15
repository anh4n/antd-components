import React from 'react';
import { Form as AntdForm } from 'antd';
import { useL10n } from '../Locales';

const mapPropsToFields = ({record = {}}) => {
    const data = {};

    Object.keys(record).forEach(field => {
        data[field] = AntdForm.createFormField({
            value: record[field]
        });
    });

    return data;
};

export const withForm = (Component, config = {}) => {
    const { mapProps = false } = config;

    return props => {
        let options = {
            validateMessages: useL10n().Validation,
        };

        if (mapProps) {
            options = {
                ...options,
                mapPropsToFields
            };
        }

        const Form = AntdForm.create(options)(Component);

        return (<Form {...props}/>);
    };
};
