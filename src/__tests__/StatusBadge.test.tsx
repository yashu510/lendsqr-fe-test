import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusBadge from '../components/StatusBadge';

describe('StatusBadge', () => {
  // Positive tests
  test('renders "Active" for active status', () => {
    render(<StatusBadge status="active" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  test('renders "Inactive" for inactive status', () => {
    render(<StatusBadge status="inactive" />);
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  test('renders "Pending" for pending status', () => {
    render(<StatusBadge status="pending" />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  test('renders "Blacklisted" for blacklisted status', () => {
    render(<StatusBadge status="blacklisted" />);
    expect(screen.getByText('Blacklisted')).toBeInTheDocument();
  });

  test('applies correct class for active status', () => {
    const { container } = render(<StatusBadge status="active" />);
    expect(container.firstChild).toHaveClass('status-badge--active');
  });

  test('applies correct class for blacklisted status', () => {
    const { container } = render(<StatusBadge status="blacklisted" />);
    expect(container.firstChild).toHaveClass('status-badge--blacklisted');
  });

  // Negative tests (wrong class is not applied)
  test('does not apply active class to inactive badge', () => {
    const { container } = render(<StatusBadge status="inactive" />);
    expect(container.firstChild).not.toHaveClass('status-badge--active');
  });

  test('does not apply pending class to active badge', () => {
    const { container } = render(<StatusBadge status="active" />);
    expect(container.firstChild).not.toHaveClass('status-badge--pending');
  });
});
