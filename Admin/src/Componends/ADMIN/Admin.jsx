import React from 'react';

import Sidebar from './Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import './Admin.css'; // Ensure the CSS is applied

export default function Admin() {
    return (
       <>
                <Sidebar />
                <Dashboard />
     </>  
    ); 
}
