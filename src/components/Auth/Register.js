import { Alert, Button, Col, Form, Icon, Input, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Auth.module.less';

const FormItem = Form.Item;

const AuthRegister = ({
    initialValue,
    getFieldDecorator,
    handleSubmit,
    generatePassPhrase,
    error,
    loading
}) => (
    <Form onSubmit={handleSubmit} className="login-form">
        {error && <Alert message={error} type="warning" />}
        <Row gutter={8}>
            <Col span={16}>
                <FormItem>
                    {getFieldDecorator('passphrase', {
                        initialValue,
                        rules: [
                            {
                                required: true,
                                message: 'Passphrase may not be empty!'
                            }
                        ]
                    })(
                        <Input
                            size="large"
                            prefix={<Icon type="lock" />}
                            placeholder="Passphrase"
                            onClick={e => {
                                e.target.select();
                            }}
                        />
                    )}
                </FormItem>
            </Col>
            <Col span={8}>
                <Button
                    onClick={generatePassPhrase}
                    className="w-100"
                    size="large">
                    Generate
                </Button>
            </Col>
        </Row>
        <FormItem>
            <Button
                loading={loading}
                type="primary"
                size="large"
                htmlType="submit"
                className={styles.submit}>
                Register
            </Button>
            <hr />
            Already registered?{' '}
            <Link className="ant-btn float-right" to="/login">
                Login
            </Link>
        </FormItem>
    </Form>
);

AuthRegister.propTypes = {
    getFieldDecorator: PropTypes.func.isRequired,
    generatePassPhrase: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initialValue: PropTypes.string.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool
};

export default AuthRegister;
