import './static/App.css';
import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import NotFound from './components/NotFound';
import AuthContainer from './containers/AuthContainer';
import DashboardContainer from './containers/DashboardContainer';
import { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import userStore from './store/userStore';
import Footer from './components/Footer';

const App = observer(() => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, [])

  const checkSession = async () => {
    await userStore.checkUser();
    setIsLoading(false);
  }

  if (isLoading) {
    return;
  } else return (
    <div style={{ width: "100%", height: "100%" }}>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={userStore.isLogged ? <Navigate to="/dashboard" /> : <Navigate to="/auth" />} />
        <Route path="/dashboard/*" element={userStore.isLogged ? <DashboardContainer /> : <Navigate to="/auth" />} />
        <Route exact path="/auth" element={userStore.isLogged ? <Navigate to="/dashboard" /> : <AuthContainer />} />
      </Routes>
      <Footer />
    </div>
  )
})

export default App;
