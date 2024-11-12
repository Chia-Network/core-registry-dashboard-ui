import React from 'react';
import { BrowserRouter as Router, Navigate, redirect, Route, Routes } from 'react-router-dom';
import ROUTES from '@/routes/route-constants';
import * as Pages from '@/pages';
import { Template } from '@/components';

const AppNavigator: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route // remove trailing slash
            path="*(/+)"
            loader={({ params }) => redirect(params['*'] || '/')}
          />
          <Route path="" element={<Template />}>
            <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} />} />
            <Route path={ROUTES.DASHBOARD} element={<Pages.Dashboard />} />
            <Route path="*" element={<Navigate replace to={ROUTES.DASHBOARD} />} />
          </Route>
        </Routes>
        {/* app-wide blocking modals go below this comment*/}
      </Router>
    </>
  );
};

export { AppNavigator };
