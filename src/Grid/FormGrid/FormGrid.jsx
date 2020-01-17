import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {message} from 'antd';
import {Form} from '@root/DataEntry';
import {SaveButton} from '@root/Buttons';
import {renderForm} from '@root/Grid/renderer';
import {BaseGrid} from '@root/Grid/BaseGrid';
import { emptyFn } from '@root/helper';

/**
 * @return {React.Component}
 *
 * @constructor
 */
export const FormGrid = (props) => {
    const { idProperty, onSave, children, onAfterRenderForm, ...restProps } = props;
    const [ isEditing, setEditing ] = useState(false);
    const [ selectedRowKeys, setSelectedRowKeys ] = useState([]);
    const [ isLoading, setLoading ] = useState(false);

    const EditForm = (props) => {
        const handleSubmit = (e, data) => {
            setLoading(true);

            onSave(data)
                .then(() => {
                    setSelectedRowKeys([]);
                    setLoading(false);
                    setEditing(false);
                })
                .catch(err => {
                    setLoading(false);
                    message.error(err.toString());
                });
        };

        return (
            <Form onAfterRenderForm={onAfterRenderForm} onSubmit={handleSubmit} {...props}>
                {renderForm(props, children)}
                <SaveButton htmlType='submit'/>
            </Form>
        );
    };

    return (
        <BaseGrid
            rowKey={idProperty}
            editForm={<EditForm/>}
            idProperty={idProperty}
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
};

FormGrid.defaultProps = {
    dataSource: [],
    idProperty: 'id',
    onSave: () => Promise.resolve(),
    onAfterRenderForm: emptyFn
};

FormGrid.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
    dataSource: PropTypes.array,
    idProperty: PropTypes.string,
    onAdd: PropTypes.func,
    onAfterRenderForm: PropTypes.func,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onSave: PropTypes.func
};
