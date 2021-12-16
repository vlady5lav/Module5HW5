import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/ownTypes';
import ButtonSpinner from '../../components/ButtonSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import RegistrationStore from '../../stores/RegistrationStore';

const Registration = observer(() => {
  const store = useInjection<RegistrationStore>(ownTypes.registrationStore);
  const { t } = useTranslation(['registration']);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={4} md={6} xs>
          <Form
            onSubmit={(ev) => {
              ev.preventDefault();
              store.register();
            }}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>{t('firstName')}</Form.Label>
              <Form.Control
                placeholder={t('placeholder.firstName')}
                value={store.firstName}
                onChange={(ev) => {
                  store.changeEmail(ev.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>{t('lastName')}</Form.Label>
              <Form.Control
                placeholder={t('placeholder.lastName')}
                value={store.lastName}
                onChange={(ev) => {
                  store.changeEmail(ev.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGender">
              <Form.Label>{t('gender')}</Form.Label>
              <Form.Select defaultValue={t('placeholder.gender').toString()}>
                <option>{t('placeholder.gender')}</option>
                <option>{t('genderType.male')}</option>
                <option>{t('genderType.female')}</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{t('emailAddress')}</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder={t('placeholder.email')}
                value={store.email}
                onChange={(ev) => {
                  store.changeEmail(ev.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmailConfirmation">
              <Form.Label>{t('emailAddressConfirmation')}</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder={t('placeholder.emailConfirmation')}
                value={store.emailConfirmation}
                onChange={(ev) => {
                  store.changeEmailConfirmation(ev.target.value);
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

            <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
              <Form.Label>{t('passwordConfirmation')}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t('placeholder.passwordConfirmation')}
                value={store.passwordConfirmation}
                onChange={(ev) => {
                  store.changePasswordConfirmation(ev.target.value);
                }}
              />
            </Form.Group>

            <ErrorMessage error={store.error} />

            <ButtonSpinner queryString="false" isLoading={store.isLoading} variant="primary" type="submit" text={t('submit')} />

            {!!store.token && (
              <p className="mt-3 mb-3" style={{ color: 'green', fontSize: 14, fontWeight: 700 }}>
                {t('success', { token: store.token, id: store.id })}
              </p>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
});

export default Registration;
