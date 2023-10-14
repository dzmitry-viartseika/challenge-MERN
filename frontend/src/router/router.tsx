import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import { routerConfig } from '../router/router.config';

export const Router = () => {
  const routes = useRoutes(routerConfig);

  return <Suspense fallback="Loading...">{routes}</Suspense>;
};

export default Router;
