import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form as AntdForm, message } from 'antd';
import { FormItem } from '@root/DataEntry';
import { useL10n as l10n } from '@root/Locales';
import { withForm } from '@root/hoc';
import { emptyFn, ReactChildren } from '@root/helper';

const hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
};

const AntdFormWrapper = withForm((props) => {
    const { record, onSubmit, disableSaveButtonOnError, children, form, ...restProps } = props;
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

            onSubmit(e,{
                ...record,
                ...data
            }, form);
        });
    };

    const formItems = ReactChildren.recursiveMap(children, child => {
        if (!child) {
            return null;
        }

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
        <AntdForm onSubmit={onHandleSubmit} {...restProps}>
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
    onChange: emptyFn,
    onSubmit: emptyFn
};

Form.propTypes = {
    disableSaveButtonOnError: PropTypes.bool,
    record: PropTypes.object,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
};
