import { introduceMySelf } from '../src/index';

describe('introduceMySelf', () => {
  it('should introduce me', () => {
    expect(introduceMySelf('N', 'S')).toEqual('Hello N S');
  });
});
