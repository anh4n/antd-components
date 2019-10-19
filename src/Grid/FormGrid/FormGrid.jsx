import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Table from 'antd/lib/table';
import { Column } from './Column';
import { message, Form } from 'antd';
import { AddButton, DeleteButton, EditButton, BackButton, SaveButton } from '../..';
import { renderForm } from '../renderer';

/**
 * @return {React.Component}
 *
 * @constructor
 */
export const FormGrid = Form.create()((props) => {
    const { idProperty, dataSource, onAddRowClick, onDeleteRowClick, onEditRowClick, toolbar, children, ...restProps } = props;

    const [isEditing, setEditing] = useState(false);
    const [record, setRecord] = useState({});
    const [data, setData] = useState(dataSource);

    let selected = [];

    useEffect(() => {
        setData(dataSource);
    }, [dataSource]);

    const onRowSelection = (selectedRowKeys, selectedRows) => {
        selected = selectedRows;
    };

    const columns = React.Children.map(children, child => {
        return {
            title: child.props.title,
            dataIndex: child.props.dataIndex,
            onCell: record => ({
                record,
                ...child.props
            }),
        };
    });

    const components = {
        body: {
            cell: Column,
        },
    };

    const onEditClick = () => {
        if (selected.length === 1) {
            setEditing(true);
            setRecord(selected[0]);
            onEditRowClick(selected[0])
        } else if (selected.length === 0) {
            message.error('You have to select one row at least');
        } else {
            message.error('You can edit only one row');
        }
    };

    const onDeleteClick = () => {
        if (selected.length > 0) {
            onDeleteRowClick(selected)
        } else {
            message.error('You have to select one row at least');
        }
    };

    const getToolbar = () => {
        if (toolbar) {
            return () => (
                <Fragment>
                    <AddButton onClick={onAddRowClick}/>
                    <EditButton onClick={onEditClick}/>
                    <DeleteButton onClick={onDeleteClick}/>
                </Fragment>
            );
        }
    };

    if (isEditing) {
        const FormWrapper = Form.create({
            mapPropsToFields(props) {
                const data = {};
                Object.keys(props).forEach(field => {
                    data[field] = Form.createFormField({
                        value: props[field]
                    })
                });

                return data;
            }
        })
        (props => {
                const { form } = props;

                const onSaveClick = () => {
                    form.validateFields((error, data) => {
                        if (error) {
                            return message.error('form validation failed');
                        }

                        console.log(data);
                    });
                };

                return (
                    <Fragment>
                        <BackButton onClick={() => setEditing(false)}/>
                        <Form>
                            {renderForm(props, children)}
                            <SaveButton onClick={onSaveClick}/>
                        </Form>
                    </Fragment>
                );
            }
        );

        return <FormWrapper {...record}/>;
    }

    return (
        <Table
            rowKey={idProperty}
            title={getToolbar()}
            {...restProps}
            components={components}
            dataSource={data}
            columns={columns}
            rowSelection={{
                onChange: onRowSelection,
            }}
        />
    );
});

FormGrid.defaultProps = {
    idProperty: 'id',
    onRecordCreate: (record) => (record),
};

FormGrid.propTypes = {
    idProperty: PropTypes.string,
    onRecordCreate: PropTypes.func,
    dataSource: PropTypes.array
};
