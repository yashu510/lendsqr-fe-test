import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../../data/mockUsers';
import { User } from '../../types/user';
import { saveUserToStorage } from '../../utils/storage';
import StatusBadge from '../../components/StatusBadge';
import './Users.scss';

const PAGE_SIZES = [10, 20, 50, 100];

const stats = [
  { label: 'Users', value: '2,453', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
  )},
  { label: 'Active Users', value: '2,453', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  )},
  { label: 'Users with Loans', value: '12,453', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
    </svg>
  )},
  { label: 'Users with Savings', value: '102,453', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
  )},
];

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [filters, setFilters] = useState({ org: '', username: '', email: '', date: '', phone: '', status: '' });
  const [applied, setApplied] = useState(filters);
  const filterRef = useRef<HTMLDivElement>(null);

  const filtered = mockUsers.filter(u => {
    if (applied.org && !u.organization.toLowerCase().includes(applied.org.toLowerCase())) return false;
    if (applied.username && !u.username.toLowerCase().includes(applied.username.toLowerCase())) return false;
    if (applied.email && !u.email.toLowerCase().includes(applied.email.toLowerCase())) return false;
    if (applied.phone && !u.phone.includes(applied.phone)) return false;
    if (applied.status && u.status !== applied.status) return false;
    if (applied.date) {
      const d = new Date(u.dateJoined).toLocaleDateString('en-GB');
      if (!d.includes(applied.date)) return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
      setActiveMenu(null);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleViewUser = (user: User) => {
    saveUserToStorage(user);
    navigate(`/dashboard/users/${user.id}`);
  };

  const getPageNumbers = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
      if (page < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="users-page">
      <h1>Users</h1>

      <div className="users-page__stats">
        {stats.map((s, i) => (
          <div key={i} className="users-page__stat-card">
            <div className="icon-wrapper">{s.icon}</div>
            <div className="label">{s.label}</div>
            <div className="value">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="users-page__table-card">
        <div className="users-page__table-wrap">
          <table className="users-page__table">
            <thead>
              <tr>
                {['Organization','Username','Email','Phone Number','Date Joined','Status',''].map((h, i) => (
                  <th key={i}>
                    <div className="th-inner">
                      {h}
                      {h && h !== '' && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                          onClick={() => { setFilterOpen(h === 'Organization' || filterOpen ? !filterOpen : true); }}>
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map(user => (
                <tr key={user.id}>
                  <td>{user.organization}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{new Date(user.dateJoined).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                  <td><StatusBadge status={user.status} /></td>
                  <td className="actions-cell">
                    <button className="actions-btn" onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === user.id ? null : user.id); }}>
                      <svg width="4" height="16" viewBox="0 0 4 16" fill="currentColor">
                        <circle cx="2" cy="2" r="2"/><circle cx="2" cy="8" r="2"/><circle cx="2" cy="14" r="2"/>
                      </svg>
                    </button>
                    {activeMenu === user.id && (
                      <div className="users-page__actions-menu">
                        <button onClick={() => handleViewUser(user)}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                          </svg>
                          View Details
                        </button>
                        <button>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                            <line x1="23" y1="11" x2="17" y2="11"/>
                          </svg>
                          Blacklist User
                        </button>
                        <button>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                            <polyline points="16 11 18 13 22 9"/>
                          </svg>
                          Activate User
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Filter Dropdown */}
        {filterOpen && (
          <div className="users-page__filter" ref={filterRef} style={{ position: 'absolute', top: 340, left: 40, zIndex: 20 }}>
            <h4>Filter</h4>
            {[
              { label: 'Organization', key: 'org', type: 'text' },
              { label: 'Username', key: 'username', type: 'text' },
              { label: 'Email', key: 'email', type: 'text' },
              { label: 'Date', key: 'date', type: 'date' },
              { label: 'Phone Number', key: 'phone', type: 'text' },
            ].map(f => (
              <div key={f.key} className="filter-group">
                <label>{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.label}
                  value={filters[f.key as keyof typeof filters]}
                  onChange={e => setFilters(prev => ({ ...prev, [f.key]: e.target.value }))}
                />
              </div>
            ))}
            <div className="filter-group">
              <label>Status</label>
              <select value={filters.status} onChange={e => setFilters(prev => ({ ...prev, status: e.target.value }))}>
                <option value="">Select</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="blacklisted">Blacklisted</option>
              </select>
            </div>
            <div className="filter-actions">
              <button className="reset" onClick={() => { setFilters({ org:'',username:'',email:'',date:'',phone:'',status:'' }); setApplied({ org:'',username:'',email:'',date:'',phone:'',status:'' }); setPage(1); }}>Reset</button>
              <button className="apply" onClick={() => { setApplied(filters); setPage(1); setFilterOpen(false); }}>Filter</button>
            </div>
          </div>
        )}

        <div className="users-page__pagination">
          <div className="showing">
            Showing
            <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}>
              {PAGE_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            out of {filtered.length}
          </div>
          <div className="pages">
            <button className="nav" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
            {getPageNumbers().map((p, i) => (
              p === '...'
                ? <span key={`e-${i}`} style={{ padding: '0 4px' }}>...</span>
                : <button key={p} className={page === p ? 'active' : ''} onClick={() => setPage(p as number)}>{p}</button>
            ))}
            <button className="nav" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
