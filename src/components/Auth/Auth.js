import React from 'react';
import { Col, Row } from 'antd';
import logo from '../../assets/images/logo_theledger_black.svg';
import cn from 'classnames';
import styles from '../../components/Auth/Auth.module.less';
import { Switch } from 'react-router';

const Auth = ({ children }) => (
    <Row className="height-100" type="flex" justify="center">
        <Col
            xxl={4}
            xl={5}
            lg={6}
            md={10}
            sm={16}
            xs={20}
            className={styles.authWrapper}>
            <div className={cn('tl_logo', styles.logo)}>
                <img src={logo} alt="barn logo" />
                <h1>React boilerplate</h1>
            </div>
            <div className={styles.authContent}>
                <Switch>{children}</Switch>
            </div>
        </Col>
    </Row>
);

export default Auth;
