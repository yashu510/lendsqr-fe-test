import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserFromStorage } from '../../utils/storage';
import { mockUsers } from '../../data/mockUsers';
import { User } from '../../types/user';
import './UserDetails.scss';

const tabs = ['General Details', 'Documents', 'Bank Details', 'Loans', 'Savings', 'App and System'];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="stars">
    {[1, 2, 3].map(i => (
      <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i <= rating ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
  </div>
);

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!id) return;
    // Try localStorage first, then fallback to mock data
    const stored = getUserFromStorage(id);
    if (stored) {
      setUser(stored);
    } else {
      const found = mockUsers.find(u => u.id === id);
      if (found) setUser(found);
    }
  }, [id]);

  if (!user) return (
    <div style={{ padding: 40, textAlign: 'center', color: '#545F7D' }}>
      <p>User not found.</p>
      <button onClick={() => navigate('/dashboard/users')} style={{ marginTop: 16, color: '#39CDCC', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>
        ← Back to Users
      </button>
    </div>
  );

  return (
    <div className="user-details">
      <button className="user-details__back" onClick={() => navigate('/dashboard/users')}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
        Back to Users
      </button>

      <h1>User Details</h1>

      <div className="user-details__actions">
        <button className="blacklist">Blacklist User</button>
        <button className="activate">Activate User</button>
      </div>

      <div className="user-details__profile-card">
        <div className="profile-top">
          <div className="avatar">{user.fullName.charAt(0)}</div>
          <div className="name-block">
            <h2>{user.fullName}</h2>
            <span>{user.id}</span>
          </div>
          <div className="divider" />
          <div className="tier-block">
            <h4>User's Tier</h4>
            <StarRating rating={2} />
          </div>
          <div className="divider" />
          <div className="balance-block">
            <h2>{user.accountBalance}</h2>
            <span>{user.accountNumber}/{user.bankName}</span>
          </div>
        </div>

        <div className="profile-tabs">
          {tabs.map((tab, i) => (
            <button key={i} className={activeTab === i ? 'active' : ''} onClick={() => setActiveTab(i)}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 0 && (
        <div className="user-details__content">
          <div className="user-details__section">
            <h3>Personal Information</h3>
            <div className="info-grid">
              {[
                { label: 'Full Name', value: user.fullName },
                { label: 'Phone Number', value: user.phone },
                { label: 'Email Address', value: user.email },
                { label: 'BVN', value: user.bvn },
                { label: 'Gender', value: user.gender },
                { label: 'Marital Status', value: user.maritalStatus },
                { label: 'Children', value: user.children },
                { label: 'Type of Residence', value: user.typeOfResidence },
              ].map((item, i) => (
                <div key={i} className="info-item">
                  <label>{item.label}</label>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="user-details__section">
            <h3>Education and Employment</h3>
            <div className="info-grid">
              {[
                { label: 'Level of Education', value: user.levelOfEducation },
                { label: 'Employment Status', value: user.employmentStatus },
                { label: 'Sector of Employment', value: user.sectorOfEmployment },
                { label: 'Duration of Employment', value: user.durationOfEmployment },
                { label: 'Office Email', value: user.officeEmail },
                { label: 'Monthly Income', value: user.monthlyIncome },
                { label: 'Loan Repayment', value: user.loanRepayment },
              ].map((item, i) => (
                <div key={i} className="info-item">
                  <label>{item.label}</label>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="user-details__section">
            <h3>Socials</h3>
            <div className="info-grid">
              {[
                { label: 'Twitter', value: user.twitter },
                { label: 'Facebook', value: user.facebook },
                { label: 'Instagram', value: user.instagram },
              ].map((item, i) => (
                <div key={i} className="info-item">
                  <label>{item.label}</label>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="user-details__section">
            <h3>Guarantor</h3>
            <div className="info-grid">
              {[
                { label: 'Full Name', value: user.guarantorName },
                { label: 'Phone Number', value: user.guarantorPhone },
                { label: 'Email Address', value: user.guarantorEmail },
                { label: 'Relationship', value: user.guarantorRelationship },
              ].map((item, i) => (
                <div key={i} className="info-item">
                  <label>{item.label}</label>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab !== 0 && (
        <div className="user-details__content" style={{ textAlign: 'center', padding: '60px', color: '#545F7D' }}>
          <p>{tabs[activeTab]} tab content coming soon.</p>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
