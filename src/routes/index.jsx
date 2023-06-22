import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import UserProfile from '../pages/UserProfile';
import ClientDetails from '../pages/ClientDetails';
import NewClient from '../pages/NewClient';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/newclient" element={<NewClient />} />
      <Route path="/clients/:id" element={<ClientDetails />} />
    </Routes>
  );
};

export default AppRoutes;
