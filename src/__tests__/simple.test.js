// Simple utility functions for testing
const utils = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b,
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  formatUsername: (username) => {
    if (!username) return '';
    return username.trim().toLowerCase();
  },
};

describe('Utility Functions', () => {
  describe('add function', () => {
    test('should add two numbers correctly', () => {
      expect(utils.add(2, 3)).toBe(5);
      expect(utils.add(-1, 1)).toBe(0);
      expect(utils.add(0, 0)).toBe(0);
    });
  });

  describe('multiply function', () => {
    test('should multiply two numbers correctly', () => {
      expect(utils.multiply(2, 3)).toBe(6);
      expect(utils.multiply(-2, 3)).toBe(-6);
      expect(utils.multiply(0, 5)).toBe(0);
    });
  });

  describe('isValidEmail function', () => {
    test('should validate email addresses correctly', () => {
      expect(utils.isValidEmail('test@example.com')).toBe(true);
      expect(utils.isValidEmail('user@domain.org')).toBe(true);
      expect(utils.isValidEmail('invalid-email')).toBe(false);
      expect(utils.isValidEmail('test@')).toBe(false);
      expect(utils.isValidEmail('@example.com')).toBe(false);
    });
  });

  describe('formatUsername function', () => {
    test('should format username correctly', () => {
      expect(utils.formatUsername('  TestUser  ')).toBe('testuser');
      expect(utils.formatUsername('ADMIN')).toBe('admin');
      expect(utils.formatUsername('')).toBe('');
      expect(utils.formatUsername(null)).toBe('');
      expect(utils.formatUsername(undefined)).toBe('');
    });
  });
}); 