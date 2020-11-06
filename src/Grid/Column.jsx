import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { getDisplay } from '@root/Grid/renderer';
import { EditableContext } from '@root/Grid/BaseGrid';
import { FormItem } from '@root/DataEntry';
import {emptyFn} from "@root/helper";

/**
 * @return {React.Component}
 *
 * @constructor
 */
export const Column = (props) => {

    const {
        children,
        dataIndex,
        editable,
        fieldProps,
        fieldType,
        hideInGrid,
        isEditing,
        maxLength,
        record,
        required,
        rules,
        renderer,
        ...restProps
    } = props;

    const form = useContext(EditableContext);

    if (!dataIndex) {
        return (
            <td {...restProps}>{children}</td>
        );
    }

    const value = record[dataIndex];

    if (isEditing && editable) {
        return (
            <td {...restProps} valign={'top'}>
                <FormItem
                    dataIndex={dataIndex}
                    fieldProps={fieldProps}
                    fieldType={fieldType}
                    form={form}
                    initialValue={value}
                    required={required}
                    rules={rules}
                    style={{ margin: 0 }}
                />
            </td>
        );
    }
    return (
        <td {...restProps}>
            {(renderer) ? renderer({ children, value }) : getDisplay({ children, fieldType, maxLength, value, fieldProps })}
        </td>
    );
};

Column.defaultProps = {
    editable: true,
    fieldType: 'string',
    fieldProps: {},
    hideInGrid: false,
    required: false,
    rules: []
};

Column.propTypes = {
    dataIndex: PropTypes.string,
    editable: PropTypes.bool,
    fieldProps: PropTypes.object,
    fieldType: PropTypes.oneOf(['boolean', 'image', 'html', 'object', 'list', 'number', 'string', 'select', 'text', 'tree', 'radio']),
    hideInGrid: PropTypes.bool,
    isEditing: PropTypes.bool,
    maxLength: PropTypes.number,
    record: PropTypes.object,
    required: PropTypes.bool,
    rules: PropTypes.array,
    renderer: PropTypes.func
};
