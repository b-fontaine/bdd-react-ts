import React from 'react';
import logo from '@axa-fr/react-toolkit-core/dist/assets/logo-axa.svg';
import { Header, Name } from '@axa-fr/react-toolkit-all';

import './Header.scss';

const HeaderApp = () => (
  <Header>
    <Name title="Souscription AXA" img={logo} alt="Logo React" />
  </Header>
);

export default HeaderApp;
