import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import LiveStream from './components/LiveStream';
import Search from './components/Search';
import Statistics from './components/Statistics';
import SyslogInput from './components/SyslogInputForward';
import NotFound from './components/NotFound';
import SideBar from './components/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
<script src="https://kit.fontawesome.com/f118c1ff11.js" crossorigin="anonymous"></script>

const App = () => (
  <div style={{backgroundColor: "#9FB0BE", minHeight: "100vh",boxSizing: "border-box"}}>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<SideBar />}>
          <Route index element={<Dashboard />} />
          <Route path="livestream" element={<LiveStream />} />
          <Route path="search" element={<Search />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="syslog-input" element={<SyslogInput />} />
        </Route>
      </Route>
      
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />

    </Routes>

  </div>
);

export default App;
