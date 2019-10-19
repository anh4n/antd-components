import React from 'react';
import PropTypes from 'prop-types';
import { Editor as TinyMCE } from '@tinymce/tinymce-react';

/**
 * @return {React.Component}
 *
 * @constructor
 */
export const Editor = () => {

    const handleEditorChange = (e) => {
        console.log('Content was updated:', e.target.getContent());
    };

    return (
        <TinyMCE
            initialValue="<p>This is the initial content of the editor</p>"
            init={{
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
            }}
            onChange={handleEditorChange}
        />
    );
};

Editor.defaultProps = {
};

Editor.propTypes = {
};
