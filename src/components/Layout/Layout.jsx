import { NavLink, Outlet } from 'react-router-dom';
import { MdDashboard, MdReceipt, MdAddCircle, MdAccountBalanceWallet, MdBarChart } from 'react-icons/md';
import { useState } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import './Layout.css';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: <MdDashboard /> },
  { path: '/transactions', label: 'Transactions', icon: <MdReceipt /> },
  { path: '/transactions/new', label: 'Add Transaction', icon: <MdAddCircle /> },
  { path: '/budget', label: 'Budget', icon: <MdAccountBalanceWallet /> },
  { path: '/analytics', label: 'Analytics', icon: <MdBarChart /> },
];

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <HiX /> : <HiMenuAlt3 />}
      </button>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <MdAccountBalanceWallet className="logo-icon" />
          <h2>FinTrack</h2>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
