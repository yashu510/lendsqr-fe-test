import React from 'react';
import { UserStatus } from '../../types/user';
import './StatusBadge.scss';

interface Props {
  status: UserStatus;
}

const StatusBadge: React.FC<Props> = ({ status }) => (
  <span className={`status-badge status-badge--${status}`}>
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </span>
);

export default StatusBadge;
