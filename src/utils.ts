export function getRandomInt(min: number, max: number): number {
  const range = max - min;
  const bytesNeeded = Math.ceil(Math.log2(range) / 8);
  const maxNum = Math.pow(256, bytesNeeded);
  const maxRange = maxNum - (maxNum % range);

  let value: number;
  do {
    const randomBytes = new Uint8Array(bytesNeeded);
    crypto.getRandomValues(randomBytes);
    value = randomBytes.reduce((acc, byte) => (acc << 8) + byte, 0);
  } while (value >= maxRange);

  return min + (value % range);
}
