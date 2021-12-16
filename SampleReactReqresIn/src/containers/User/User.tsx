import React from 'react';
import { Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/ownTypes';
import ButtonSpinner from '../../components/ButtonSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import UserCard from '../../components/UserCard';
import UserStore from '../../stores/UserStore';

const User = observer(() => {
  const store = useInjection<UserStore>(ownTypes.userStore);
  const { t } = useTranslation(['user']);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={4} md={6} xs>
          <InputGroup className="mb-2">
            <FormControl
              type="number"
              value={store.queryString}
              onChange={(ev) => {
                store.changeQueryString(ev.target.value);
              }}
              isInvalid={!!store.error}
              placeholder={t('placeholder')}
            />
            <ButtonSpinner
              isLoading={store.isLoading}
              queryString={store.queryString}
              variant="primary"
              onClick={store.search}
              type="button"
              text={t('submit')}
            />
          </InputGroup>
          <ErrorMessage error={store.error} />
          <UserCard user={store.user} />
        </Col>
      </Row>
    </Container>
  );
});

export default User;
