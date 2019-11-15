import React from 'react';
import { Display2 } from '../../src';
import Select from '../examples/Form/Select';
import { Col, Row } from "antd";

/**
 * @return {React.Component}
 */
export const SelectComponent = () => {
    return (
        <Row>
            <Col xs={24} md={24}>
                <Display2>Select</Display2>
                <Select />
            </Col>
        </Row>
    );
};
