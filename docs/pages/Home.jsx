import React, { Fragment } from 'react';
import { Display3 } from '../../src';
import styled from 'styled-components';
import { Row, Typography } from 'antd';
import { Code } from '../components/utils';

const { Text } = Typography;
/**
 * @return {React.Component}
 */
export const Home = () => {

    const Icon = styled('span')`                              
        font-size: 20px;
        padding: 15px;
        font-weight: 500;
    `;

    return (
        <Fragment>

            <Display3>Hangar Library of Antd and React</Display3>
            <p>We developed a library of modified Antd and React Components</p>

            <img height={150} src={'https://gw.alipayobjects.com/zos/rmsportal/tXlLQhLvkEelMstLyHiN.svg'}/>
            <Icon>+</Icon>
            <img height={150} src={'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'}/>
            <Icon>=</Icon>
            <img height={150} src={'images/hangar-logo-big.png'}/>

            <br/><br/>

            <Row>
                <Display3> Installation </Display3>
                <Text style={{ fontSize: 18 }} copyable code>
                    npm install @react-hangar/antd-components
                </Text>
            </Row>

            <br/><br/>

            <Row>
                <Display3> Import Styles </Display3>
                <Text style={{ fontSize: 18 }} copyable code>
                    {`import '@react-hangar/antd-components/dist/antd.css';`}
                </Text><br/>
                <Text style={{ fontSize: 18 }} copyable code>
                    {`import '@react-hangar/antd-components/dist/antd-components.css';`}
                </Text>
                <br/>
                <br/>
                <b>Important: You don´t need to import antd styles anymore.</b><br/>
                Available variations: <Code>antd.css</Code> <Code>antd-red.css</Code> <Code>antd-blue.css</Code>
                <Code>antd-pink.css</Code> <Code>antd-mint.css</Code><br/>
            </Row>

            <br/><br/>

        </Fragment>

    );
};
