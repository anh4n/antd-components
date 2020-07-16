import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, FormItem } from '@root/DataEntry';
import { useL10n as l10n } from '@root/Locales';
import { emptyFn } from '@root/helper';
import { Button } from '@root/Buttons';
import { Col, Row } from 'antd';

/**
 * @return {React.Component}
 *
 * @constructor
 */
export const Login = (props) => {
    const { onSubmit, showRememberMe, registerUrl, forgotPasswordUrl, children } = props;

    return (
        <Form onSubmit={onSubmit}>
            <FormItem fieldType={'string'} label={l10n().Login.username} dataIndex={'username'} required/>
            <FormItem style={{ marginBottom: 5 }} fieldType={'password'} label={l10n().Login.password}
                      dataIndex={'password'} required/>

            <Row>
                <Col span={8}>
                    {registerUrl ? <Link to={registerUrl}>{l10n().Login.register}</Link> : null}
                </Col>
                <Col span={8} offset={8} style={{textAlign: 'right'}}>
                    {forgotPasswordUrl ? <Link to={forgotPasswordUrl}>{l10n().Login.forgotPassword}</Link> : null}
                </Col>
            </Row>

            <Row style={{ paddingTop: 50 }}>
                <Col>
                    <Button htmlType="submit">{l10n().Login.loginText}</Button>
                </Col>
            </Row>
            {showRememberMe ? <FormItem style={{ margin: '5px' }} fieldType={'checkbox'}
                                        fieldProps={{ title: l10n().Login.rememberMe }}
                                        dataIndex={'rememberMe'}/> : null}

            {children}
        </Form>
    );
};

Login.defaultProps = {
    onSubmit: emptyFn
};

Login.propTypes = {
    onSubmit: PropTypes.func,
    showRememberMe: PropTypes.bool,
    registerUrl: PropTypes.string,
    forgotPasswordUrl: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
};
