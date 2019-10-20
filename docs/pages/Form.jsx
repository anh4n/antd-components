import React, { Fragment } from 'react';
import { Display2 } from '../../src';
import DynamicFormItem from '../examples/Form/DynamicFormItem';
import Editor from '../examples/Form/Editor';
import Upload from "../examples/Upload/Upload";

/**
 * @return {React.Component}
 */
export const Form = () => {
    return (
        <Fragment>
            <Display2>Form</Display2>
            <DynamicFormItem/>
            <Editor/>
            <Upload />
        </Fragment>
    );
};
