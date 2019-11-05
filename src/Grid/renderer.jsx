import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Popover, Switch, Input, InputNumber, Icon } from 'antd';
import { FormItem, Editor, CodeMirror, ListField, Upload, prettifyJson, truncateText, useL10n as l10n } from '..';

const Link = styled.span`
    cursor: pointer;
    text-decoration: underline;
`;

const CodeSnippet = ({ html, link, children }) => {
    const content = (
        <pre style={{ margin: 0 }}>
            {html ? <div dangerouslySetInnerHTML={{ __html: children }}/> : children}
        </pre>
    );

    return (
        <Popover content={content}>
            <Link>{link}</Link>
        </Popover>
    );
};

const ImagePreview = ({ data }) => {
    let url, title;
    let MoreLink = null;

    if (!data || Array.isArray(data) && data.length === 0) {
        return <Icon type={'picture'} style={{fontSize: '40px'}} />;
    }

    if (Array.isArray(data)) {
        url = data[0].url;
        title = data[0].name;
        if (data.length > 1) {
            MoreLink = <span style={{ paddingLeft: '5px' }}>({data.length - 1} {l10n().Form.moreText})</span>;
        }
    } else {
        url = data.url;
        title = data.name;
    }

    return (
        <Fragment>
            <Popover content={<img height={150} src={url}/>} title={title}>
                <span style={{ cursor: 'pointer' }}>
                    <img height={40} src={url}/>
                </span>
            </Popover>
            {MoreLink}
        </Fragment>
    );
};

export const getDisplay = ({ children, fieldType, maxLength, value }) => {
    switch (fieldType) {
        case 'boolean':
            return (<Switch disabled={true} checked={value}/>);
        case 'object':
            return (<CodeSnippet link={'object'}>{prettifyJson(value, 2)}</CodeSnippet>);
        case 'html':
            return (<CodeSnippet link={'html'} html>{value}</CodeSnippet>);
        case 'list':
            return (<CodeSnippet link={'list'}>{prettifyJson(value, 2)}</CodeSnippet>);
        case 'image':
            return (<ImagePreview data={value}/>);
        case 'string':
            return truncateText(value, maxLength);
        case 'number':
            return value;
        default:
            return children;
    }
};

export const getInput = ({ fieldType, fieldProps = {}, ...restProps }) => {

    switch (fieldType) {
        case 'boolean':
            return (<FormItem {...restProps} valuePropName={'checked'}><Switch/></FormItem>);
        case 'image':
            return (<FormItem {...restProps} valuePropName={'fileList'}><Upload {...fieldProps} /></FormItem>);
        case 'html':
            return (<FormItem {...restProps}><Editor/></FormItem>);
        case 'object':
            return (<FormItem {...restProps}><CodeMirror/></FormItem>);
        case 'list':
            return (<FormItem {...restProps}><ListField/></FormItem>);
        case 'number':
            return (<FormItem {...restProps}><InputNumber/></FormItem>);
        case 'string':
        default:
            return (<FormItem {...restProps} ><Input/></FormItem>);
    }
};

export const renderForm = (props, columns) => {
    return React.Children.map(columns, child => {
        const { title, dataIndex, fieldType, required, rules, fieldProps } = child.props;

        return getInput({ fieldType, dataIndex, title, form: props.form, required, rules, fieldProps });
    });
};
