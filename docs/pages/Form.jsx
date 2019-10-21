import React, { Fragment } from 'react';
import { Display2 } from '../../src';
import ListField from '../examples/Form/ListField';
import Editor from '../examples/Form/Editor';
import Upload from '../examples/Form/Upload';
import CodeMirror from '../examples/Form/CodeMirror';

/**
 * @return {React.Component}
 */
export const Form = () => {
    return (
        <Fragment>
            <Display2>Form</Display2>
            <ListField/>
            <Editor/>
            <CodeMirror/>
            <Upload />
        </Fragment>
    );
};
