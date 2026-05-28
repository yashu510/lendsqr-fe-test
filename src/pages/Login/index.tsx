import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Enter a valid email';
    if (!password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-page__left">
        <div className="logo">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M15 0C6.716 0 0 6.716 0 15s6.716 15 15 15 15-6.716 15-15S23.284 0 15 0z" fill="#39CDCC"/>
            <path d="M9 10h12M9 15h8M9 20h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>lendsqr</span>
        </div>
        <svg className="hero-image" viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="60" y="40" width="360" height="280" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <rect x="80" y="70" width="320" height="40" rx="6" fill="rgba(57,205,204,0.2)"/>
          <rect x="80" y="125" width="140" height="120" rx="6" fill="rgba(255,255,255,0.08)"/>
          <rect x="235" y="125" width="165" height="55" rx="6" fill="rgba(255,255,255,0.08)"/>
          <rect x="235" y="190" width="165" height="55" rx="6" fill="rgba(255,255,255,0.08)"/>
          <rect x="80" y="260" width="320" height="40" rx="6" fill="rgba(57,205,204,0.1)"/>
          {[0,1,2,3,4].map(i => (
            <circle key={i} cx={100 + i * 60} cy={90} r="10" fill="rgba(57,205,204,0.4)"/>
          ))}
        </svg>
      </div>

      <div className="login-page__right">
        <div className="mobile-logo">
          <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
            <path d="M15 0C6.716 0 0 6.716 0 15s6.716 15 15 15 15-6.716 15-15S23.284 0 15 0z" fill="#39CDCC"/>
          </svg>
          <span>lendsqr</span>
        </div>

        <div className="login-page__form-header">
          <h1>Welcome Back!</h1>
          <p>Enter details to login.</p>
        </div>

        <form className="login-page__form" onSubmit={handleSubmit}>
          <div className="login-page__input-group">
            <div className="input-wrapper">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })); }}
                className={errors.email ? 'error' : ''}
              />
            </div>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="login-page__input-group">
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: undefined })); }}
                className={errors.password ? 'error' : ''}
              />
              <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <a href="#!" className="login-page__forgot">Forgot password?</a>

          <button type="submit" className="login-page__submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
