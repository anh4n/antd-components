import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Button, Divider} from 'antd';
import { Code, PropertyTable } from './utils';
import { Display3 } from '../../src';
import './ComponentDisplay.scss';

/**
 * @return {React.Component}
 *
 * @constructor
 */
export const ComponentDisplay = ({title, code, properties, description, children}) => {
    const [collapsed, setCollapsed] = useState(true);

    const renderCodeButton = () => {
        return (
            collapsed
                ? <Button icon='eye' size='small' onClick={() => setCollapsed(false)}>Show Code</Button>
                : <Button icon='eye-invisible' size='small' onClick={() => setCollapsed(true)}>Hide Code</Button>
        );
    };

    return (
        <div className='hangar-component-display'>

            <Display3>{title}</Display3>

            <div className='content'>
                {children}
            </div>

            { description ?
                <div className='description'>
                    <Divider orientation="left">Description</Divider>
                    <p>{description}</p>
                </div> : null
            }
            {
                code ? <div className='footer'>{renderCodeButton()}</div> : null
            }
            {
                code && !collapsed ? <Code>{code}</Code> : null
            }
            {
                properties ? <PropertyTable dataSource={properties}/> : null
            }

        </div>
    );
};

ComponentDisplay.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    code: PropTypes.string,
    properties: PropTypes.arrayOf(PropTypes.object)
};
