import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import nanoid from 'nanoid';
import { emptyFn, IconButton, AddButton, useL10n as l10n } from '..';

export const ListField = forwardRef((props, ref) => {
    const { addText = l10n().Form.addNewField, label, onChange, value = [] } = props;

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
                    <IconButton
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
                <AddButton style={{width: '100%'}} type="dashed" onClick={add}>
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
