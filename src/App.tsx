import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './Features/ProtectedRoute';
import Login from './Pages/LoginForm/LoginPage.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <ProtectedRoute path="/dashboard" element={<Dashboard />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default App;