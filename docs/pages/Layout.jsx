import React from 'react';
import { Display2 } from '../../src';
import { Col, Row } from 'antd';
import Header from '../examples/Layout/Header';

/**
 * @return {React.Component}
 */
export const LayoutHeader = () => {
    return (
        <Row>
            <Col xs={24} md={24}>
                <Display2>Layout / Header</Display2>
                <Header/>
            </Col>
        </Row>
    );
};
