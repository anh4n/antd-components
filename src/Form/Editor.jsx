import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Editor as TinyMCE } from '@tinymce/tinymce-react';

/**
 * @return {React.Component}
 *
 * @constructor
 */

export const Editor = forwardRef((props) => {
    const {id, value, 'data-__field': dataField, 'data-__meta': dataMeta ,onChange, ref, ...restProps} = props;

    const onEditorChange = (e) => {
        onChange(e.target.getContent());
    };

    return (
        <TinyMCE
            ref={ref}
            value={value}
            onChange={onEditorChange}
            init={restProps}
        />
    );
});

Editor.defaultProps = {
    height: 500,
    menubar: false,
    plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
    ],
    toolbar:
        'undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help'
};

Editor.propTypes = {
    height: PropTypes.number,
    menubar: PropTypes.bool,
    plugins: PropTypes.arrayOf(PropTypes.string),
    toolbar: PropTypes.string,
    value: PropTypes.string
};
