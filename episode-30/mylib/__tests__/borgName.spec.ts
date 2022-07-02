import { borgName } from '../src';

describe('borgName', () => {
  it('should give me a borg name', () => {
    const myName = borgName();
    const out = myName.match(/^Your Borg name is (\d+) of (\d+)$/);
    if (out) {
      const [_, numOne, numTwo] = out;
      expect(parseInt(numOne) < parseInt(numTwo)).toBeTruthy();
    }
  });
});
