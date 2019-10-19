import React from 'react';
import AntdButton from 'antd/lib/button/button';
import invert from 'invert-color';
import styled from 'styled-components';
import './Buttons.scss';

export const Button = (props) => {
    const { color = 'default', ...restProps } = props;

    //toDo validate hex color code
    if (color.indexOf('#') !== -1) {

        const StyledButton = styled(AntdButton)`
                background-color: ${color};
                color: ${invert(color, true)};
                margin: 3px;
                &:hover, &:focus {
                    background-color: ${color};
                    color: ${invert(color, true)};
                    filter: brightness(90%);
                    border: 1px solid ${color}
                }
        `;

        return (
            <StyledButton
                {...restProps}
            />
        );

    } else {
        return (
            <AntdButton
                className={'hangar-btn hangar-btn-color-' + color}
                {...restProps}
            />
        );
    }
};

export const AddButton = ({ icon = 'plus', children = 'Add', ...restProps }) =>
    <Button icon={icon} {...restProps}>{children}</Button>;

export const DeleteButton = ({ icon = 'delete', children = 'Delete', ...restProps }) =>
    <Button icon={icon} {...restProps}>{children}</Button>;

export const EditButton = ({ icon = 'edit', children = 'Edit', ...restProps }) =>
    <Button icon={icon} {...restProps}>{children}</Button>;

export const ReloadButton = ({ icon = 'reload', children = 'Reload', ...restProps }) =>
    <Button icon={icon} {...restProps}>{children}</Button>;

export const BackButton = ({ icon = 'left', children = 'Back', ...restProps }) =>
    <Button icon={icon} {...restProps}>{children}</Button>;

export const SearchButton = ({ icon = 'search', children = 'Search', ...restProps }) =>
    <Button icon={icon} {...restProps}>{children}</Button>;

export const SaveButton = ({ icon = 'save', children = 'Save', ...restProps }) =>
    <Button icon={icon} {...restProps}>{children}</Button>;

export const CancelButton = ({ icon = 'close', children = 'Cancel', ...restProps }) =>
    <Button icon={icon} {...restProps}>{children}</Button>;

export const CloseButton = ({ icon = 'close', children = 'Close', ...restProps }) =>
    <Button icon={icon} {...restProps}>{children}</Button>;

export const UndoButton = ({ icon = 'rollback', children = 'Undo', ...restProps }) =>
    <Button icon={icon} {...restProps}>{children}</Button>;

export const SettingsButton = ({ icon = 'setting', children = 'Settings', ...restProps }) =>
    <Button icon={icon} {...restProps}>{children}</Button>;

export const BasketButton = ({ icon = 'shopping-cart', children = 'Add To Basket', ...restProps }) =>
    <Button icon={icon} {...restProps}>{children}</Button>;

