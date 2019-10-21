import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Icon, Input } from 'antd';
import styled from 'styled-components';
import nanoid from 'nanoid';
import { emptyFn } from '../../src';

const AddButton = styled(Button)`
    width: 100%;
`;

const DeleteButton = styled(Icon)`
    &:hover {
      color: #777;
    }
    cursor: pointer;
    position: relative;
    top: 4px;
    font-size: 24px;
    color: #999;
    transition: all 0.3s;
    margin-left: 8px;
`;

export const ListField = forwardRef((props, ref) => {
    const { addText, label, onChange, value = [] } = props;

    const initialState = value.map(v => ({ key: nanoid(10), value: v }));
    const [store, setStore] = useState(initialState);

    useEffect(() => {
        onChange([
            ...store.map(rec => rec.value)
        ]);
    }, [store]);

    const onInputChange = (key, e) => {
        const value = e.target.value;
        setStore(prevStore =>
            prevStore.map(rec => (key === rec.key) ? { key, value } : rec)
        );
    };

    const add = () => {
        setStore(prevStore =>
            [
                ...prevStore,
                { key: nanoid(10), value: '' }
            ]
        );
    };

    const remove = key => {
        setStore(prevStore =>
            [
                ...prevStore.filter(rec => rec.key !== key)
            ]
        );
    };

    const formItems = store.map(({ key, value }, index) => (
        <Form.Item
            label={index === 0 ? label : ''}
            required={false}
            key={key}
        >
            <div style={{ display: 'flex' }}>
                <Input value={value} onChange={onInputChange.bind(null, key)}/>
                {store.length > 1 ? (
                    <DeleteButton
                        type="minus-circle-o"
                        onClick={() => remove(key)}
                    />
                ) : null}
            </div>
        </Form.Item>
    ));

    return (
        <div ref={ref}>
            {formItems}
            <Form.Item>
                <AddButton type="dashed" onClick={add}>
                    <Icon type="plus"/> {addText}
                </AddButton>
            </Form.Item>
        </div>
    );
});

ListField.defaultProps = {
    addText: 'Add field',
    onChange: emptyFn
};

ListField.propTypes = {
    addText: PropTypes.string
};
