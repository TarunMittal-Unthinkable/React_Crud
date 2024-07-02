import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const breadcrumbPaths = {
    '/brandlist': ['Brand'],
    '/productlist': ['Brand', 'Product'],
    '/categorylist': ['Brand', 'Product','Category'],
  };
  
  const DynamicBreadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);
    //console.log(pathnames);
  
    // Check if the current path has a predefined breadcrumb path
    const specialBreadcrumb = breadcrumbPaths[location.pathname];
    const pathSegments = specialBreadcrumb ? specialBreadcrumb.map((name, index) => {
      const path = specialBreadcrumb.slice(0, index + 1).join('/').toLowerCase();
      return { name, url: `/${path}` };
    }) : pathnames.map((name, index) => {
      const url = `/${pathnames.slice(0, index + 1).join('/')}`;
      return { name: name.charAt(0).toUpperCase() + name.slice(1), url };
    });
  
    return (
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        {pathSegments.map((segment, index) => (
          <React.Fragment key={index}>
            {" / "}
            <Link to={segment.url}>{segment.name}</Link>
          </React.Fragment>
        ))}
      </div>
    );
  };

export default DynamicBreadcrumbs;