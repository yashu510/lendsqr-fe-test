import { saveUserToStorage, getUserFromStorage, getUsersFromStorage } from '../utils/storage';
import { User } from '../types/user';

const mockUser: User = {
  id: 'test-user-1',
  organization: 'TestOrg',
  username: 'testuser',
  email: 'test@example.com',
  phone: '08012345678',
  dateJoined: '2023-01-01T00:00:00.000Z',
  status: 'active',
  fullName: 'Test User',
  bvn: '12345678901',
  gender: 'Male',
  maritalStatus: 'Single',
  children: '0',
  typeOfResidence: 'Personal Apartment',
  levelOfEducation: 'B.Sc',
  employmentStatus: 'Employed',
  sectorOfEmployment: 'FinTech',
  durationOfEmployment: '2 years',
  officeEmail: 'test@testorg.com',
  monthlyIncome: '₦200,000 - ₦500,000',
  loanRepayment: '₦20,000',
  twitter: '@testuser',
  facebook: 'Test User',
  instagram: '@test_user',
  guarantorName: 'John Doe',
  guarantorPhone: '08099999999',
  guarantorEmail: 'guarantor@test.com',
  guarantorRelationship: 'Friend',
  accountBalance: '₦500,000',
  accountNumber: '1234567890',
  bankName: 'GTBank',
};

describe('storage utility', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Positive tests
  test('saves user to localStorage', () => {
    saveUserToStorage(mockUser);
    const stored = getUserFromStorage(mockUser.id);
    expect(stored).not.toBeNull();
    expect(stored?.id).toBe(mockUser.id);
  });

  test('retrieves saved user by id', () => {
    saveUserToStorage(mockUser);
    const retrieved = getUserFromStorage(mockUser.id);
    expect(retrieved?.fullName).toBe('Test User');
    expect(retrieved?.email).toBe('test@example.com');
  });

  test('returns all stored users', () => {
    saveUserToStorage(mockUser);
    const all = getUsersFromStorage();
    expect(Object.keys(all)).toHaveLength(1);
    expect(all[mockUser.id]).toBeDefined();
  });

  test('overwrites existing user with updated data', () => {
    saveUserToStorage(mockUser);
    const updated = { ...mockUser, status: 'inactive' as const };
    saveUserToStorage(updated);
    const retrieved = getUserFromStorage(mockUser.id);
    expect(retrieved?.status).toBe('inactive');
  });

  // Negative tests
  test('returns null for non-existent user id', () => {
    const result = getUserFromStorage('does-not-exist');
    expect(result).toBeNull();
  });

  test('returns empty object when storage is empty', () => {
    const all = getUsersFromStorage();
    expect(Object.keys(all)).toHaveLength(0);
  });

  test('handles corrupted localStorage gracefully', () => {
    localStorage.setItem('lendsqr_user_details', 'not-valid-json{{{');
    const result = getUserFromStorage('any-id');
    expect(result).toBeNull();
  });
});
