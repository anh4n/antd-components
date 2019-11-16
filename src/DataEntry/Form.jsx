import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormItem, useL10n as l10n, emptyFn } from '..';
import { Form as AntdForm, message } from 'antd';
import { withForm } from '../hoc';

const hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
};

const AntdFormWrapper = withForm((props) => {
    const { record, onSubmit, disableSaveButtonOnError, children, form } = props;
    const { getFieldsError } = form;

    const formValidationError = l10n().Validation.form;

    useEffect(() => {
        if (disableSaveButtonOnError) {
            form.validateFields();
        }
    }, []);

    const onHandleSubmit = (e) => {
        e.preventDefault();

        form.validateFieldsAndScroll((error, data) => {
            if (error) {
                return message.error(formValidationError);
            }

            onSubmit({
                ...record,
                ...data
            }, form);
        });
    };

    const formItems = React.Children.map(children, child => {
        if (disableSaveButtonOnError && 'submit' === child.props.htmlType) {
            return React.cloneElement(child, {
                disabled: hasErrors(getFieldsError())
            });
        }

        if ('FormItem' === child.type.displayName) {
            return (
                <FormItem {...child.props} form={form} disableInitialError={disableSaveButtonOnError}/>
            );
        } else {
            return child;
        }
    });

    return (
        <AntdForm onSubmit={onHandleSubmit}>
            {formItems}
        </AntdForm>
    );
}, { mapProps: true });

/**
 * @return {React.Component}
 *
 * @constructor
 */
export const Form = (props) => {
    return (<AntdFormWrapper {...props} />);
};

Form.defaultProps = {
    disableSaveButtonOnError: false,
    record: {},
    onSubmit: emptyFn
};

Form.propTypes = {
    disableSaveButtonOnError: PropTypes.bool,
    record: PropTypes.object,
    onSubmit: PropTypes.func
};
