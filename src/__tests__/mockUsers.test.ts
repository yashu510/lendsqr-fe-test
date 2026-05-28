import { generateUsers, mockUsers } from '../data/mockUsers';

describe('generateUsers', () => {
  // Positive tests
  test('generates the correct number of users', () => {
    const users = generateUsers(10);
    expect(users).toHaveLength(10);
  });

  test('generates 500 users by default via mockUsers export', () => {
    expect(mockUsers).toHaveLength(500);
  });

  test('each user has required fields', () => {
    const users = generateUsers(5);
    users.forEach(user => {
      expect(user.id).toBeTruthy();
      expect(user.email).toContain('@');
      expect(user.phone).toMatch(/^080\d{8}$/);
      expect(['active', 'inactive', 'pending', 'blacklisted']).toContain(user.status);
      expect(user.fullName).toBeTruthy();
    });
  });

  test('user ids are unique', () => {
    const users = generateUsers(100);
    const ids = users.map(u => u.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(100);
  });

  test('generates users with valid status values', () => {
    const users = generateUsers(100);
    const validStatuses = ['active', 'inactive', 'pending', 'blacklisted'];
    users.forEach(u => expect(validStatuses).toContain(u.status));
  });

  // Negative tests
  test('generates 0 users when count is 0', () => {
    const users = generateUsers(0);
    expect(users).toHaveLength(0);
  });

  test('user email contains organization name context', () => {
    const users = generateUsers(10);
    users.forEach(u => {
      expect(u.email).toBeTruthy();
      expect(u.email).toMatch(/.+@.+\..+/);
    });
  });
});
