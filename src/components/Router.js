import React, { createContext, useContext, useState, useEffect } from 'react';

const RouterContext = createContext();

export const RouterProvider = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState('/');
  const [routeParams, setRouteParams] = useState({});

  useEffect(() => {
    const handlePopState = () => {
      const route = window.location.pathname;
      parseRoute(route);
    };

    window.addEventListener('popstate', handlePopState);
    parseRoute(window.location.pathname);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const parseRoute = (route) => {
    // Handle stream route
    const streamMatch = route.match(/^\/stream\/(\d+)$/);
    if (streamMatch) {
      setCurrentRoute('/stream/:streamId');
      setRouteParams({ streamId: streamMatch[1] });
      return;
    }

    // Handle profile route
    const profileMatch = route.match(/^\/profile\/(\d+)$/);
    if (profileMatch) {
      setCurrentRoute('/profile/:userId');
      setRouteParams({ userId: profileMatch[1] });
      return;
    }

    // Handle other routes
    setCurrentRoute(route);
    setRouteParams({});
  };

  const navigate = (route) => {
    window.history.pushState({}, '', route);
    parseRoute(route);
  };

  return (
    <RouterContext.Provider value={{ currentRoute, routeParams, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

export const Link = ({ to, children, ...props }) => {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}; 