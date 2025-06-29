import { test, expect } from "vitest";
import { generatePassword, generatePIN } from "../src/index";
import { getRandomInt } from "../src/utils";

// getRandomInt tests
test("getRandomInt generates numbers within range", () => {
  const min = 0;
  const max = 10;
  const iterations = 1000;

  for (let i = 0; i < iterations; i++) {
    const result = getRandomInt(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThan(max);
  }
});

test("getRandomInt handles negative ranges", () => {
  const min = -10;
  const max = 0;
  const iterations = 1000;

  for (let i = 0; i < iterations; i++) {
    const result = getRandomInt(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThan(max);
  }
});

test("getRandomInt generates different numbers in sequence", () => {
  const min = 0;
  const max = 100;
  const results = new Set<number>();

  // Generate 100 random numbers
  for (let i = 0; i < 100; i++) {
    results.add(getRandomInt(min, max));
  }

  // Check if we have a good distribution (at least 50 unique numbers)
  expect(results.size).toBeGreaterThan(50);
});

// Password generation tests
test("generatePassword with default options", () => {
  const password = generatePassword();
  expect(password.length).toBe(16);
  expect(password).toMatch(/[a-z]/); // lowercase
  expect(password).toMatch(/[A-Z]/); // uppercase
  expect(password).toMatch(/[0-9]/); // numbers
  expect(password).not.toMatch(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/); // symbols
});

test("generatePassword with custom length", () => {
  const length = 20;
  const password = generatePassword({ length });
  expect(password.length).toBe(length);
});

test("generatePassword with all character types", () => {
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

test("generatePassword with only lowercase", () => {
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

test("generatePassword with only numbers", () => {
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

test("generatePassword throws error for length < 8", () => {
  expect(() => generatePassword({ length: 7 })).toThrow(
    "Password length must be at least 8 characters"
  );
});

test("generatePassword throws error when no character types enabled", () => {
  expect(() =>
    generatePassword({
      lowercase: false,
      uppercase: false,
      numbers: false,
      symbols: false,
    })
  ).toThrow("At least one character type must be enabled");
});

test("generatePassword throws error when length too short for required types", () => {
  expect(() =>
    generatePassword({
      length: 3,
      lowercase: true,
      uppercase: true,
      numbers: true,
      symbols: true,
    })
  ).toThrow("Password length must be at least 8 characters");
});

// PIN generation tests
test("generatePIN with default options", () => {
  const pin = generatePIN();
  expect(pin.length).toBe(4);
  expect(pin).toMatch(/^[0-9]+$/);
});

test("generatePIN with custom length", () => {
  const length = 6;
  const pin = generatePIN({ length });
  expect(pin.length).toBe(length);
  expect(pin).toMatch(/^[0-9]+$/);
});

test("generatePIN throws error for length < 4", () => {
  expect(() => generatePIN({ length: 3 })).toThrow(
    "PIN length must be at least 4 digits"
  );
});
