import React, {Fragment, useState} from 'react';
import { ComponentDisplay } from '../../components/ComponentDisplay';
import {
    Button,
    AddButton,
    DeleteButton,
    EditButton,
    ReloadButton,
    SearchButton,
    CancelButton,
    CloseButton,
    UndoButton,
    SettingsButton,
    BasketButton,
    SaveButton,
    UploadButton,
    BackButton,
    IconButton
} from '../../../src';
import {message, Row, Select} from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Text from 'antd/es/typography/Text';
import {Divider} from 'antd';

const onCopy = (e) => {
    message.info(<span><Text code>{e}</Text> copied!</span>);
};

// Example implementation
const Example = () => {

    const [locale, switchLocale] = useState('en-EN');

    const onLocaleChange = (value) => {
        switchLocale(value);
    };

    return (
        <Fragment>

            <Row style={{margin: 3}}>
                <Select defaultValue={locale} style={{ width: 140 }} onChange={onLocaleChange}>
                    <Select.Option value="en-EN">Locale: en-EN</Select.Option>
                    <Select.Option value="de-DE">Locale: de-DE</Select.Option>
                    <Select.Option value="sr-SP">Locale: sr-SP</Select.Option>
                </Select>
            </Row>

            <Divider />

            <CopyToClipboard
                text={'<AddButton onClick={onClick}/>'}
                onCopy={() => onCopy('<AddButton onClick={onClick}/>')}>
                <AddButton locale={locale}/>
            </CopyToClipboard>

            <CopyToClipboard
                text={'<DeleteButton onClick={onClick} />'}
                onCopy={() => onCopy('<DeleteButton onClick={onClick} />')}>
                <DeleteButton/>
            </CopyToClipboard>

            <CopyToClipboard
                text={'<EditButton onClick={onClick} />'}
                onCopy={() => onCopy('<EditButton onClick={onClick} />')}>
                <EditButton/>
            </CopyToClipboard>

            <CopyToClipboard
                text={'<ReloadButton onClick={onClick}/>'}
                onCopy={() => onCopy('<ReloadButton onClick={onClick} />')}>
                <ReloadButton/>
            </CopyToClipboard>

            <CopyToClipboard
                text={'<BackButton onClick={onClick}/>'}
                onCopy={() => onCopy('<BackButton onClick={onClick} />')}>
                <BackButton/>
            </CopyToClipboard>

            <CopyToClipboard
                text={'<SearchButton onClick={onClick}/>'}
                onCopy={() => onCopy('<SearchButton onClick={onClick}/>')}>
                <SearchButton/>
            </CopyToClipboard>

            <CopyToClipboard
                text={'<SaveButton onClick={onClick}/>'}
                onCopy={() => onCopy('<SaveButton onClick={onClick}/>')}>
                <SaveButton/>
            </CopyToClipboard>

            <CopyToClipboard
                text={'<CancelButton onClick={onClick}/>'}
                onCopy={() => onCopy('<CancelButton onClick={onClick}/>')}>
                <CancelButton/>
            </CopyToClipboard>

            <CopyToClipboard
                text={'<CloseButton onClick={onClick}/>'}
                onCopy={() => onCopy('<CloseButton onClick={onClick}/>')}>
                <CloseButton/>
            </CopyToClipboard>

            <CopyToClipboard
                text={'<UndoButton onClick={onClick}/>'}
                onCopy={() => onCopy('<UndoButton onClick={onClick}/>')}>
                <UndoButton/>
            </CopyToClipboard>

            <CopyToClipboard
                text={'<SettingsButton onClick={onClick}/>'}
                onCopy={() => onCopy('<SettingsButton onClick={onClick}/>')}>
                <SettingsButton/>
            </CopyToClipboard>

            <CopyToClipboard
                text={'<BasketButton onClick={onClick}/>'}
                onCopy={() => onCopy('<BasketButton onClick={onClick}/>')}>
                <BasketButton/>
            </CopyToClipboard>

            <CopyToClipboard
                text={'<UploadButton onClick={onClick}/>'}
                onCopy={() => onCopy('<UploadButton onClick={onClick}/>')}>
                <UploadButton/>
            </CopyToClipboard>

            <CopyToClipboard
                text={'<Button onClick={onClick} icon=\'bulb\'>Custom</Button>'}
                onCopy={() => onCopy('<Button onClick={onClick} icon=\'bulb\'>Custom</Button>')}>
                <Button icon='bulb'>Custom</Button>
            </CopyToClipboard>

            <CopyToClipboard
                text={'<IconButton type="minus-circle-o"/>'}
                onCopy={() => onCopy('<IconButton type="minus-circle-o"/>')}>
                <IconButton type="minus-circle-o"/>
            </CopyToClipboard>
        </Fragment>
    );
};

// Code example
// language=JS
const code = `
    import React, { Fragment } from 'react';
    import {
        Button,
        AddButton,
        DeleteButton,
        EditButton,
        ReloadButton,
        SearchButton,
        CancelButton,
        CloseButton,
        UndoButton,
        SettingsButton,
        BasketButton,
        SaveButton,
        UploadButton,
        BackButton,
        IconButton
    } from '@react-hangar/antd-components';

    const onClick = () => {
        console.log('do fancy stuff!');
    };

    const Example = () => {
        return (
            <Fragment>
                <AddButton onClick={onClick}/>
                <DeleteButton onClick={onClick}/>
                <EditButton onClick={onClick}/>
                <ReloadButton onClick={onClick}/>
                <BackButton onClick={onClick}/>
                <SearchButton onClick={onClick}/>
                <SaveButton onClick={onClick}/>
                <CancelButton onClick={onClick}/>
                <CloseButton onClick={onClick}/>
                <UndoButton onClick={onClick}/>
                <SettingsButton onClick={onClick}/>
                <BasketButton onClick={onClick}/>
                <UploadButton onClick={onClick}/>
                <Button onClick={onClick} icon='bulb'>Custom</Button>
                <IconButton type="minus-circle-o"/>
            </Fragment>
        );
    };

    export default Example;
`;

// Component props
const properties = [
    { property: 'onClick', description: 'Function is called on button click', type: 'function' },
    { property: 'color', description: 'optional color of the button', type: 'string' },
    {property: 'locale', description: 'available locales: "en-EN", "de-DE", "sr-SP"', type: 'string', default: 'en-EN'},
    {
        property: '(Inherited)',
        description: 'Ant design properties are inherited (see: https://ant.design/components/button/)'
    },
];

export default () => (
    <Fragment>
        <ComponentDisplay title={'Types'} code={code} properties={properties}>
            <Example/>
        </ComponentDisplay>
    </Fragment>
);
