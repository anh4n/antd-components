import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { BaseGrid, EditableContext } from '../BaseGrid';
import { IconButton, emptyFn, withForm } from '../..';

/**
 * @return {React.Component}
 *
 * @constructor
 */
export const DataGrid = withForm((props) => {
    const { idProperty, onAdd, onEdit, onSave, form, children, ...restProps } = props;
    const [isEditing, setEditing] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const onSaveClick = () => {
        form.validateFields((error, record) => {
            if (error) {
                return message.error('form validation failed');
            }

            setLoading(true);

            onSave({ [idProperty]: selectedRowKeys[0], ...record })
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

    const onAddClick = (rec) => {
        return onAdd(rec) || rec;
    };

    const onEditClick = (id) => {
        onEdit(id);
    };

    const onCancelClick = () => {
        setSelectedRowKeys([]);
        setEditing(false);
    };

    const actionRenderer = (text, record) => {
        const id = record[idProperty];

        if (!isEditing || id !== selectedRowKeys[0]) {
            return null;
        }

        return (
            <div style={{ height: '40px', lineHeight: '40px' }}>
                <IconButton type="save" onClick={onSaveClick}/>
                <IconButton type="stop" onClick={onCancelClick}/>
            </div>
        );
    };

    const extraColumns = [
        {
            dataIndex: 'operation',
            className: 'hangar-min-td',
            render: actionRenderer
        }
    ];

    return (
        <EditableContext.Provider value={form}>
            <BaseGrid
                rowKey={idProperty}
                extraColumns={extraColumns}
                onAdd={onAddClick}
                onEdit={onEditClick}
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
        </EditableContext.Provider>
    );
});

DataGrid.defaultProps = {
    idProperty: 'id',
    onAdd: (record) => (record),
    onDelete: () => Promise.resolve(),
    onEdit: emptyFn,
    onSave: () => Promise.resolve()
};

DataGrid.propTypes = {
    dataSource: PropTypes.array,
    idProperty: PropTypes.string,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onSave: PropTypes.func
};
