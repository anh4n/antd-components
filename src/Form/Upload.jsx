import React, { forwardRef } from 'react';
import {UploadButton} from '../index';
import AntdUpload from 'antd/lib/upload/Upload';
import message from 'antd/lib/message';
import PropTypes from "prop-types";

const getListType = (type) => {
    if (typeof type === 'object' && type.image || typeof type === 'string' && type === 'image') {
        return 'picture';
    }
};

const getFileTypes = (type) => {
    if (typeof type === 'object') {
        if (type.image) {
            return type.image;
        } else if (type.file) {
            return type.file;
        } else {
            message.error('invalid type. see property description in docs. ');
        }
    }

    return false;
};

const validate = (type) => {
    let fileTypes = getFileTypes(type);

    if (fileTypes && fileTypes.length > 0) {
        return (file) => {
            let needle = file.type.replace('image/', '').replace('file/', '');

            if (!fileTypes.includes(needle)) {
                message.error('You can only upload "' + fileTypes + '" files!', 8);
                return false;
            }

            return true;
        };
    }

    return  () => {return true};
};

export const Upload = forwardRef((props, ref) => {
    let {
        onUploaded,
        onChange,
        fileList,
        customRequestData,
        listType,
        action,
        type,
        children,
        ...restProps
    } = props;

    if (fileList && fileList.length > 0) {
        fileList.forEach((rec, idx) => {
            return rec.uid = idx;
        });
    } else if (fileList && typeof fileList === 'object') {
        fileList.uid = 0;
        fileList = [fileList]
    }

    listType = getListType(type);

    const onChangeData = info => {

        onChange(info.fileList);

        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            onUploaded(info.file.response);
        }
    };

    return (
        <AntdUpload
            ref={ref}
            className='hangar-upload'
            defaultFileList={fileList ? [...fileList] : []}
            action={action}
            listType={listType}
            beforeUpload={validate(type)}
            onChange={onChangeData}
            data={customRequestData}
            {...restProps}
        >
            <UploadButton> {children} </UploadButton>
        </AntdUpload>
    );
});

Upload.defaultProps = {
    children: 'Upload',
    onChange: () => {},
    onUploaded: () => {}
};

Upload.propTypes = {
    listType: PropTypes.string,
    children: PropTypes.string,
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    action: PropTypes.string,
    customRequestData: PropTypes.object,
    fileList: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),
    onUploaded: PropTypes.func,
    onChange: PropTypes.func
};
