# Better Password Generator

A secure and flexible password and PIN generation library for Node.js.

## Features

- Generate secure random passwords with customizable options
- Generate random PINs with configurable length
- Cryptographically secure using Node.js crypto module
- ES Module support

## Installation

```bash
npm install @better-password/better-password
# or
pnpm add @better-password/better-password
# or
yarn add @better-password/better-password
```

## Usage

### Password Generation

```javascript
import { generatePassword } from '@better-password/better-password';

// Generate a default password (16 characters, includes lowercase, uppercase, and numbers)
const password = generatePassword();
console.log(password); // Example: "k02AX1kPprCDc1VNfvmt"

// Generate a password with custom options
const customPassword = generatePassword({
  length: 20, // Length of the password
  lowercase: true, // Include lowercase letters
  uppercase: true, // Include uppercase letters
  numbers: true, // Include numbers
  symbols: true, // Include special characters
});
console.log(customPassword); // Example: "Kj#9mP$2vN@5xL&8qR*"
```

#### Password Generation Options

| Option    | Type    | Default | Description                            |
| --------- | ------- | ------- | -------------------------------------- |
| length    | number  | 16      | Length of the password (minimum: 8)    |
| lowercase | boolean | true    | Include lowercase letters (a-z)        |
| uppercase | boolean | true    | Include uppercase letters (A-Z)        |
| numbers   | boolean | true    | Include numbers (0-9)                  |
| symbols   | boolean | false   | Include special characters (see below) |

Special characters: `!@#$%^&*()_+-=[]{}|;:,.<>?`

### PIN Generation

```javascript
import { generatePIN } from '@better-password/better-password';

// Generate a default PIN (4 digits)
const pin = generatePIN();
console.log(pin); // Example: "8035"

// Generate a PIN with custom length
const customPin = generatePIN({ length: 6 });
console.log(customPin); // Example: "803593"
```

#### PIN Generation Options

| Option | Type   | Default | Description                    |
| ------ | ------ | ------- | ------------------------------ |
| length | number | 4       | Length of the PIN (minimum: 4) |

## Security

- Uses Node.js built-in `crypto` module for secure random number generation
- Ensures at least one character from each enabled character set in passwords
- Shuffles password characters to ensure random distribution

## Error Handling

The library throws errors in the following cases:

- Password length less than 8 characters
- PIN length less than 4 digits
- No character types enabled for password generation
- Password length too short to accommodate all required character types

## License

MIT

##

Special thanks to [Wei Zhu](https://www.github.com/yesmeck)
