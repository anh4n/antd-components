import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { message, Form } from 'antd';
import { SaveButton, emptyFn } from '../..';
import { renderForm } from '../renderer';
import { BaseGrid } from '../BaseGrid';

/**
 * @return {React.Component}
 *
 * @constructor
 */
export const FormGrid = Form.create()((props) => {
    const { idProperty, onSave, children, ...restProps } = props;
    const [isEditing, setEditing] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const EditForm = Form.create({
        mapPropsToFields(props) {
            const data = {};
            Object.keys(props).forEach(field => {
                data[field] = Form.createFormField({
                    value: props[field]
                });
            });

            return data;
        }
    })(props => {
        const { getFieldsError } = props.form;

        const hasErrors = (fieldsError) => {
            return Object.keys(fieldsError).some(field => fieldsError[field]);
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            props.form.validateFields((error, record) => {
                if (error) {
                    return message.error('form validation failed');
                }

                record[idProperty] = props[idProperty];

                setLoading(true);

                onSave(record)
                    .then(() => {
                        setSelectedRowKeys([]);
                        setLoading(false);
                        setEditing(false);
                    })
                    .catch(err => {
                        setLoading(false);
                        message.error(err.toString());
                    });
            });
        };
        return (
            <Form onSubmit={handleSubmit}>
                {renderForm(props, children)}
                <SaveButton disabled={hasErrors(getFieldsError())} htmlType='submit'/>
            </Form>
        );
    });

    return (
        <BaseGrid
            rowKey={idProperty}
            editForm={<EditForm/>}
            isEditing={isEditing}
            setEditing={setEditing}
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
            isLoading={isLoading}
            setLoading={setLoading}
            {...restProps}
        >
            {children}
        </BaseGrid>
    );
});

FormGrid.defaultProps = {
    dataSource: [],
    idProperty: 'id',
    onAdd: emptyFn,
    onDelete: emptyFn,
    onEdit: emptyFn,
    onSave: emptyFn
};

FormGrid.propTypes = {
    dataSource: PropTypes.array,
    idProperty: PropTypes.string,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onSave: PropTypes.func
};
