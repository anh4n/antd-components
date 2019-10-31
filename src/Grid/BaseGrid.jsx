import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import nanoid from 'nanoid';
import { AddButton, BackButton, DeleteButton, EditButton, Column, emptyFn } from '..';

export const EditableContext = React.createContext();

/**
 * @return {React.Component}
 *
 * @constructor
 */
export const BaseGrid = (props) => {
    const {
        idProperty,
        isEditing,
        setEditing,
        selectedRowKeys,
        setSelectedRowKeys,
        dataSource,
        onAdd,
        onDelete,
        onEdit,
        onSave,
        extraColumns,
        editForm,
        form,
        children,
        ...restProps
    } = props;

    const [data, setData] = useState(dataSource);

    useEffect(() => {
        setData(dataSource);
    }, [dataSource]);

    useEffect(() => {
        if (!isEditing) {
            setData(dataSource);
        }
    }, [isEditing]);

    const getRecord = () => data.find(record => record[idProperty] === selectedRowKeys[0]);

    const onBackClick = () => {
        setSelectedRowKeys([]);
        setEditing(false)
    };

    const renderEditForm = () => {
        return (
            <Fragment>
                <div style={{ padding: '16px 0' }}>
                    <BackButton onClick={onBackClick}/>
                </div>
                {
                    React.cloneElement(editForm, {
                        ...getRecord()
                    })
                }
            </Fragment>
        );
    };

    if (isEditing && editForm) {
        return renderEditForm();
    }

    const columns = React.Children.map(children, child => {
        return {
            title: child.props.title,
            dataIndex: child.props.dataIndex,
            onCell: record => ({
                record,
                isEditing: isEditing && record[idProperty] === selectedRowKeys[0],
                ...child.props
            })
        };
    });

    columns.push(...extraColumns);

    const components = {
        body: {
            cell: Column,
        },
    };

    const onAddClick = () => {
        const defaults = {
            [idProperty]: nanoid(10)
        };

        const record = { ...defaults, ...onAdd(defaults) };
        const newData = [...data, record];
        setData(newData);
        setSelectedRowKeys([record[idProperty]]);
        setEditing(true);
    };

    const onEditClick = () => {
        setEditing(true);
        onEdit(selectedRowKeys[0]);
    };

    const onDeleteClick = () => {
        setSelectedRowKeys([]);
        setEditing(false);
        onDelete(selectedRowKeys);
    };

    const getToolbar = () => {
        return () => (
            <Fragment>
                <AddButton disabled={isEditing} onClick={onAddClick}/>
                <EditButton disabled={isEditing || selectedRowKeys.length !== 1} onClick={onEditClick}/>
                <DeleteButton disabled={selectedRowKeys.length === 0} onClick={onDeleteClick}/>
            </Fragment>
        );
    };

    const getCheckboxProps = record => ({
        disabled: isEditing && record[idProperty] !== selectedRowKeys[0]
    });

    const onRowSelection = selectedKeys => {
        setSelectedRowKeys(selectedKeys);
        setEditing(false);
    };

    return (
        <Table
            rowKey={idProperty}
            title={getToolbar()}
            components={components}
            dataSource={data}
            columns={columns}
            rowSelection={{
                selectedRowKeys,
                getCheckboxProps,
                onChange: onRowSelection
            }}
            {...restProps}
        />
    );
};

BaseGrid.defaultProps = {
    idProperty: 'id',
    onAdd: (record) => (record),
    onEdit: () => emptyFn,
    onSave: () => Promise.resolve(),
    onDelete: () => Promise.resolve(),
    extraColumns: []
};

BaseGrid.propTypes = {
    idProperty: PropTypes.string,
    onRecordCreate: PropTypes.func,
    onSave: PropTypes.func,
    onDelete: PropTypes.func,
    dataSource: PropTypes.array,
    extraColumns: PropTypes.array,
    editForm: PropTypes.element
};