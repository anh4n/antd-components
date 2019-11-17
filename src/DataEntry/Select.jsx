import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Select as AntdSelect } from 'antd';
import nanoid from 'nanoid';

const { Option, OptGroup } = AntdSelect;

const renderOptions = (options, render) => {
    return options.map(option => {
        const { group, label, value, disabled } = option;

        if (group) {
            return (
                <OptGroup key={nanoid(10)} label={group.label}>
                    {renderOptions(group.options, render)}
                </OptGroup>
            );
        }

        return (<Option key={nanoid(10)} value={value} disabled={disabled}>{render(label, value)}</Option>);
    });
};

export const Select = forwardRef((props, ref) => {
    const { options, render, style, ...restProps } = props;

    const styles = {
        width: '100%',
        ...style
    };

    return (
        <AntdSelect ref={ref} style={styles} {...restProps}>
            {renderOptions(options, render)}
        </AntdSelect>
    );
});

Select.defaultProps = {
    options: [],
    render: label => label,
    style: {}
};

Select.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            disabled: PropTypes.bool,
            label: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })
    ),
    render: PropTypes.func,
    showSearch: PropTypes.bool,
    style: PropTypes.object
};
