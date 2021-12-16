import React, { useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/ownTypes';
import Pagination from '../../components/Pagination';
import UserCard from '../../components/UserCard';
import UsersStore from '../../stores/UsersStore';

const Users = observer(() => {
  const store = useInjection<UsersStore>(ownTypes.usersStore);

  useEffect(() => {
    const getUser = async () => {
      await store.init();
    };
    getUser();
  }, [store]);

  return (
    <Container>
      <Row className="justify-content-center">
        {store.isLoading ? (
          <Spinner animation="border" />
        ) : (
          <>
            {store.users?.map((user, key) => (
              <Col key={key} sm={6} md={4} lg={3} xl={2} className="mb-2 mt-2">
                <UserCard user={user} />
              </Col>
            ))}
          </>
        )}
      </Row>
      <Pagination
        total={store.totalPages}
        active={store.currentPage}
        onChange={(val) => {
          store.changePage(val);
        }}
      />
    </Container>
  );
});

export default Users;
