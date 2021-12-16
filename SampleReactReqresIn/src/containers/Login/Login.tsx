import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/ownTypes';
import ButtonSpinner from '../../components/ButtonSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import LoginStore from '../../stores/LoginStore';

const Login = observer(() => {
  const store = useInjection<LoginStore>(ownTypes.loginStore);
  const { t } = useTranslation(['login']);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={4} md={6} xs>
          <Form
            onSubmit={(ev) => {
              ev.preventDefault();
              store.login();
            }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{t('emailAddress')}</Form.Label>
              <Form.Control
                type="email"
                placeholder={t('placeholder.email')}
                value={store.email}
                onChange={(ev) => {
                  store.changeEmail(ev.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>{t('password')}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t('placeholder.password')}
                value={store.password}
                onChange={(ev) => {
                  store.changePassword(ev.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRememberMe">
              <Form.Check type="checkbox" label={t('rememberMe')} />
            </Form.Group>
            <ErrorMessage error={store.error} />
            <ButtonSpinner queryString="false" isLoading={store.isLoading} variant="primary" type="submit" text={t('submit')} />
            {!!store.token && (
              <p className="mt-3 mb-3" style={{ color: 'green', fontSize: 14, fontWeight: 700 }}>
                {t('success', { token: store.token })}
              </p>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
});

export default Login;
