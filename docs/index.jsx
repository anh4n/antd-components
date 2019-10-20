import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { CustomCol, Wrapper } from './components/utils';
import { routes } from './routes';
import { Menu } from './Menu';
import { Display1 } from '../src';
import { renderRoutes } from '../src/Navigation/routing';

ReactDOM.render(
    <Router>
        <Row>
            <Col><Display1 className={'text-center'}>Ant Design Components</Display1></Col>
        </Row>
        <Row>
            <Col
                xs={24}
                md={5}>
                <Menu/>
            </Col>
            <CustomCol>
                <Wrapper className={'markdown-body'}>
                    <Switch>
                        {renderRoutes(routes)}
                    </Switch>
                </Wrapper>
            </CustomCol>
        </Row>
    </Router>,
    document.querySelector('#root')
);
