import { observer } from 'mobx-react';
import React, { Suspense } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/ownTypes';
import HomePageStore, { TabsType } from '../../stores/HomePageStore';
import LoadingSpinner from '../../components/LoadingSpinner';

const User = React.lazy(() => import('../../containers/User'));
const Users = React.lazy(() => import('../../containers/Users'));
const Login = React.lazy(() => import('../../containers/Login'));
const Resource = React.lazy(() => import('../../containers/Resource'));
const Resources = React.lazy(() => import('../../containers/Resources'));
const Registration = React.lazy(() => import('../../containers/Registration'));

const HomePage = observer(() => {
  const store = useInjection<HomePageStore>(ownTypes.homePageStore);
  const { t } = useTranslation(['homePage']);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Container className="pt-4 pb-4">
        <Tabs
          activeKey={store.currentTab}
          onSelect={(ev) => {
            store.changeTab(ev);
          }}
          className="mb-3">
          <Tab eventKey={TabsType[TabsType.User]} title={t('tabs.user')}>
            {store.currentTab === `${TabsType[TabsType.User]}` && <User />}
          </Tab>
          <Tab eventKey={TabsType[TabsType.Users]} title={t('tabs.users')}>
            {store.currentTab === `${TabsType[TabsType.Users]}` && <Users />}
          </Tab>
          <Tab eventKey={TabsType[TabsType.Login]} title={t('tabs.login')}>
            {store.currentTab === `${TabsType[TabsType.Login]}` && <Login />}
          </Tab>
          <Tab eventKey={TabsType[TabsType.Registration]} title={t('tabs.registration')}>
            {store.currentTab === `${TabsType[TabsType.Registration]}` && <Registration />}
          </Tab>
          <Tab eventKey={TabsType[TabsType.Resource]} title={t('tabs.resource')}>
            {store.currentTab === `${TabsType[TabsType.Resource]}` && <Resource />}
          </Tab>
          <Tab eventKey={TabsType[TabsType.Resources]} title={t('tabs.resources')}>
            {store.currentTab === `${TabsType[TabsType.Resources]}` && <Resources />}
          </Tab>
        </Tabs>
      </Container>
    </Suspense>
  );
});

export default HomePage;
