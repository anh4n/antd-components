import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Popover, Switch, Icon } from 'antd';
import { FormItem, prettifyJson, truncateText, useL10n as l10n } from '..';

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
        return <Icon type={'picture'} style={{ fontSize: '40px' }}/>;
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

export const getDisplay = ({ children, fieldType, maxLength, value, fieldProps = {} }) => {
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
        case 'select':
            return fieldProps.options.find(o => o.value === value).label; // get label for value
        default:
            return children;
    }
};

export const renderForm = (props, columns) => {
    return React.Children.map(columns, child => {
        return (<FormItem {...child.props} form={props.form}/>);
    });
};
