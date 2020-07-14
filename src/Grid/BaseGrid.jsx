import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { message, Spin, Table } from 'antd';
import nanoid from 'nanoid';
import { AddButton, BackButton, DeleteButton, EditButton } from '@root/Buttons';
import { Column } from '@root/Grid';
import { emptyFn } from '@root/helper';
import { GridButton } from '@root/Grid/Button';

export const EditableContext = React.createContext();

/**
 * @return {React.Component}
 *
 * @constructor
 */
export const BaseGrid = (props) => {
    const {
        buttons,
        dataSource,
        editForm,
        extraColumns,
        idProperty,
        isEditing,
        isLoading,
        selectedRowKeys,
        setEditing,
        setLoading,
        setSelectedRowKeys,
        onAdd,
        onDelete,
        onEdit,
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
        setEditing(false);
    };

    const renderEditForm = () => {
        return (
            <Spin spinning={isLoading}>
                <div style={{ padding: '16px 0' }}>
                    <BackButton onClick={onBackClick}/>
                </div>
                {
                    React.cloneElement(editForm, {
                        record: getRecord()
                    })
                }
            </Spin>
        );
    };

    if (isEditing && editForm) {
        return renderEditForm();
    }

    const columns = React.Children.map(children, child => {
        if (child.props.hideInGrid) return null;

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
        setLoading(true);

        onDelete(selectedRowKeys)
            .then(() => {
                setSelectedRowKeys([]);
                setEditing(false);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                message.error(err.toString());
            });
    };

    const getToolbar = () => {
        return () => (
            <Fragment>
                {
                    buttons.includes(GridButton.ADD)
                        ? <AddButton disabled={isEditing} onClick={onAddClick}/>
                        : null
                }
                {
                    buttons.includes(GridButton.EDIT)
                        ? <EditButton disabled={isEditing || selectedRowKeys.length !== 1} onClick={onEditClick}/>
                        : null
                }
                {
                    buttons.includes(GridButton.DELETE)
                        ? <DeleteButton disabled={selectedRowKeys.length === 0} onClick={onDeleteClick}/>
                        : null
                }
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

    let rowSelection = null;

    if (buttons.includes(GridButton.EDIT) || buttons.includes(GridButton.DELETE)) {
        rowSelection = {
            selectedRowKeys,
            getCheckboxProps,
            onChange: onRowSelection
        };
    }

    return (
        <Table
            rowKey={idProperty}
            title={getToolbar()}
            components={components}
            dataSource={data}
            loading={isLoading}
            columns={columns}
            rowSelection={rowSelection}
            {...restProps}
        />
    );
};

BaseGrid.defaultProps = {
    buttons: [GridButton.ADD, GridButton.EDIT, GridButton.DELETE],
    children: [],
    idProperty: 'id',
    extraColumns: [],
    onAdd: (record) => (record),
    onEdit: emptyFn,
    onDelete: () => Promise.resolve()
};

BaseGrid.propTypes = {
    buttons: PropTypes.array,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
    dataSource: PropTypes.array,
    editForm: PropTypes.element,
    extraColumns: PropTypes.array,
    idProperty: PropTypes.string,
    isEditing: PropTypes.bool,
    isLoading: PropTypes.bool,
    selectedRowKeys: PropTypes.array,
    setEditing: PropTypes.func,
    setLoading: PropTypes.func,
    setSelectedRowKeys: PropTypes.func,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func
};
