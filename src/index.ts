import crypto from 'crypto';

const CHARACTER_SETS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

export type PasswordOptions = {
  length?: number;
  lowercase?: boolean;
  uppercase?: boolean;
  numbers?: boolean;
  symbols?: boolean;
};

/**
 * Generate a secure random password
 * @param options - Password generation options
 * @returns Generated password
 */
export function generatePassword({
  length = 16,
  lowercase = true,
  uppercase = true,
  numbers = true,
  symbols = false,
}: PasswordOptions = {}): string {
  // Validate options
  if (length < 8) {
    throw new Error('Password length must be at least 8 characters');
  }

  // Calculate required characters for each type
  const requiredChars = {
    lowercase: lowercase ? 1 : 0,
    uppercase: uppercase ? 1 : 0,
    numbers: numbers ? 1 : 0,
    symbols: symbols ? 1 : 0,
  };

  const totalRequired = Object.values(requiredChars).reduce((a, b) => a + b, 0);
  if (totalRequired === 0) {
    throw new Error('At least one character type must be enabled');
  }

  if (length < totalRequired) {
    throw new Error(
      `Password length must be at least ${totalRequired} to accommodate all required character types`
    );
  }

  // Build character pool and ensure at least one character from each required type
  let password = '';
  const remainingLength = length - totalRequired;

  // Add required characters first
  if (lowercase) {
    const randomIndex = crypto.randomInt(0, CHARACTER_SETS.lowercase.length);
    password += CHARACTER_SETS.lowercase[randomIndex];
  }
  if (uppercase) {
    const randomIndex = crypto.randomInt(0, CHARACTER_SETS.uppercase.length);
    password += CHARACTER_SETS.uppercase[randomIndex];
  }
  if (numbers) {
    const randomIndex = crypto.randomInt(0, CHARACTER_SETS.numbers.length);
    password += CHARACTER_SETS.numbers[randomIndex];
  }
  if (symbols) {
    const randomIndex = crypto.randomInt(0, CHARACTER_SETS.symbols.length);
    password += CHARACTER_SETS.symbols[randomIndex];
  }

  // Build the remaining character pool
  let charPool = '';
  if (lowercase) charPool += CHARACTER_SETS.lowercase;
  if (uppercase) charPool += CHARACTER_SETS.uppercase;
  if (numbers) charPool += CHARACTER_SETS.numbers;
  if (symbols) charPool += CHARACTER_SETS.symbols;

  // Fill the remaining length with random characters
  for (let i = 0; i < remainingLength; i++) {
    const randomIndex = crypto.randomInt(0, charPool.length);
    password += charPool[randomIndex];
  }

  // Shuffle the password to ensure random distribution
  return password
    .split('')
    .sort(() => crypto.randomInt(-1, 1))
    .join('');
}

export type PinOptions = {
  length?: number;
};

/**
 * Generate a random PIN with numbers only
 * @param options - PIN generation options
 * @returns Generated PIN
 */
export function generatePIN({ length = 4 }: PinOptions = {}): string {
  // Validate options
  if (length < 4) {
    throw new Error('PIN length must be at least 4 digits');
  }

  let pin = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, CHARACTER_SETS.numbers.length);
    pin += CHARACTER_SETS.numbers[randomIndex];
  }

  return pin;
}
