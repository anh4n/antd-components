import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Select as AntdSelect } from 'antd';
import nanoid from 'nanoid';

const { Option, OptGroup } = AntdSelect;

const renderOptions = (options) => {
    return options.map(option => {
        const {group, label, value, disabled} = option;

        if (group) {
            return (
                <OptGroup key={nanoid(10)} label={group.label}>
                    {renderOptions(group.options)}
                </OptGroup>
            );
        }

        return (<Option key={nanoid(10)} value={value} disabled={disabled}>{label}</Option>);
    });
};

export const Select = forwardRef((props, ref) => {
    const { options, ...restProps } = props;

    return (
        <AntdSelect ref={ref} {...restProps}>
            {renderOptions(options)}
        </AntdSelect>
    );
});

Select.defaultProps = {
    options: []
};

Select.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            disabled: PropTypes.bool
        })
    ),
    showSearch: PropTypes.bool
};
