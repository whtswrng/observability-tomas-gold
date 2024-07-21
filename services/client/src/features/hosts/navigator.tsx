import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HostDetails from './pages/hosts/details';
import Hosts from './pages/hosts/hosts';

const HostsNavigator: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Hosts />} />
      <Route path="/:hostId" element={<HostDetails />} />
    </Routes>
  );
};

export default HostsNavigator;
