import React from 'react'
import { IoCProvider } from '../ioc/ioc.react'
import { container } from '../ioc/ioc';
import HomePage from '../pages/Home';
import '../locales/config';

const App = () => {
  return (
    <React.StrictMode>
      <IoCProvider container={container}>
        <HomePage/>
      </IoCProvider>
    </React.StrictMode>
  )
}

export default App
