import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import nanoid from 'nanoid';
import { IconButton, AddButton } from '@root/Buttons';
import { useL10n as l10n } from '@root/Locales';
import { emptyFn } from '@root/helper';
import { PureArray } from '@root/array';

export const ListField = forwardRef((props, ref) => {
    const { addText = l10n().Form.addNewField, label, onChange, value = [] } = props;

    const initialState = value.map(v => ({ key: nanoid(10), value: v }));
    const [store, setStore] = useState(initialState);
    const [lastKey, setLastKey] = useState(null);
    let inputRefs = {};

    useEffect(() => {
        onChange([
            ...store.map(rec => rec.value)
        ]);
    }, [store]);

    useEffect(() => {
        lastKey && inputRefs[lastKey].focus();
    }, [lastKey]);

    const onInputChange = (key, e) => {
        const { value } = e.target;
        setStore(prevStore =>
            PureArray.update(prevStore, ['key', key], { key, value })
        );
    };

    const add = (key) => {
        const newKey = nanoid(10);
        setStore(prevStore => {
            const index = prevStore.findIndex(el => el.key === key);
            return PureArray.insert(prevStore, { key: newKey, value: '' }, index);
        });

        setLastKey(newKey);
    };

    const remove = key => {
        setStore(prevStore =>
            PureArray.remove(prevStore, ['key', key])
        );
    };

    const handleKeyPress = (key, e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            add(key);
        }
    };

    const formItems = store.map(({ key, value }, index) => {
        return (
            <Form.Item
                label={index === 0 ? label : ''}
                required={false}
                key={key}
            >
                <div style={{ display: 'flex' }}>
                    <Input
                        ref={input => inputRefs[key] = input}
                        value={value}
                        onChange={onInputChange.bind(null, key)}
                        onKeyPress={handleKeyPress.bind(null, key)}
                    />
                    {store.length > 1 ? (
                        <IconButton
                            type="minus-circle-o"
                            onClick={() => remove(key)}
                        />
                    ) : null}
                </div>
            </Form.Item>
        );
    });

    return (
        <div ref={ref}>
            {formItems}
            <Form.Item>
                <AddButton style={{ width: '100%' }} type="dashed" onClick={add}>
                    {addText}
                </AddButton>
            </Form.Item>
        </div>
    );
});

ListField.defaultProps = {
    onChange: emptyFn
};

ListField.propTypes = {
    addText: PropTypes.string
};
