import { test, expect } from 'vitest';
import { generatePassword, generatePIN } from '../src/index';

// Password generation tests
test('generatePassword with default options', () => {
  const password = generatePassword();
  expect(password.length).toBe(16);
  expect(password).toMatch(/[a-z]/); // lowercase
  expect(password).toMatch(/[A-Z]/); // uppercase
  expect(password).toMatch(/[0-9]/); // numbers
  expect(password).not.toMatch(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/); // symbols
});

test('generatePassword with custom length', () => {
  const length = 20;
  const password = generatePassword({ length });
  expect(password.length).toBe(length);
});

test('generatePassword with all character types', () => {
  const password = generatePassword({
    length: 20,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
  });
  expect(password.length).toBe(20);
  expect(password).toMatch(/[a-z]/);
  expect(password).toMatch(/[A-Z]/);
  expect(password).toMatch(/[0-9]/);
  expect(password).toMatch(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/);
});

test('generatePassword with only lowercase', () => {
  const password = generatePassword({
    length: 10,
    lowercase: true,
    uppercase: false,
    numbers: false,
    symbols: false,
  });
  expect(password.length).toBe(10);
  expect(password).toMatch(/^[a-z]+$/);
});

test('generatePassword with only numbers', () => {
  const password = generatePassword({
    length: 10,
    lowercase: false,
    uppercase: false,
    numbers: true,
    symbols: false,
  });
  expect(password.length).toBe(10);
  expect(password).toMatch(/^[0-9]+$/);
});

test('generatePassword throws error for length < 8', () => {
  expect(() => generatePassword({ length: 7 })).toThrow(
    'Password length must be at least 8 characters'
  );
});

test('generatePassword throws error when no character types enabled', () => {
  expect(() =>
    generatePassword({
      lowercase: false,
      uppercase: false,
      numbers: false,
      symbols: false,
    })
  ).toThrow('At least one character type must be enabled');
});

test('generatePassword throws error when length too short for required types', () => {
  expect(() =>
    generatePassword({
      length: 3,
      lowercase: true,
      uppercase: true,
      numbers: true,
      symbols: true,
    })
  ).toThrow('Password length must be at least 8 characters');
});

// PIN generation tests
test('generatePIN with default options', () => {
  const pin = generatePIN();
  expect(pin.length).toBe(4);
  expect(pin).toMatch(/^[0-9]+$/);
});

test('generatePIN with custom length', () => {
  const length = 6;
  const pin = generatePIN({ length });
  expect(pin.length).toBe(length);
  expect(pin).toMatch(/^[0-9]+$/);
});

test('generatePIN throws error for length < 4', () => {
  expect(() => generatePIN({ length: 3 })).toThrow(
    'PIN length must be at least 4 digits'
  );
});
