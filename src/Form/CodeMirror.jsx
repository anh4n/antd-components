import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/idea.css';
import 'codemirror/mode/javascript/javascript';
import { Controlled } from 'react-codemirror2'

import './CodeMirror.scss';

const isJsonString = (value) => {
    try {
        const json = JSON.parse(value);
        return (typeof json === 'object');
    } catch (e) {
        return false;
    }
};

const prettifyJson = (json) => JSON.stringify(json, undefined, 4);

export const CodeMirror = forwardRef((props, ref) => {
    const { onChange, lineNumbers, indentUnit, lineSeparator, value} = props;

    return (
        <Controlled
            ref={ref}
            onBeforeChange={(editor, data, v) => {
                onChange(isJsonString(v) ? JSON.parse(v) : v);
            }}
            options={{
                mode: { name: 'javascript', json: true },
                theme: 'idea',
                lineNumbers,
                indentUnit,
                lineSeparator
            }}
            className={'hangar-codemirror-form'}
            value={prettifyJson(value)}
        />
    );
});

CodeMirror.defaultProps = {
    onChange: () => {},
    lineNumbers: true,
    indentUnit: 4,
    lineSeparator: '\n'
};

CodeMirror.propTypes = {
    onChange: PropTypes.func,
    lineNumbers: PropTypes.bool,
    indentUnit: PropTypes.number,
    lineSeparator: PropTypes.string,
};
