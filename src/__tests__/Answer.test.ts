import Answer from '../Answer';

describe('Answer test', () => {
  it('getter test', () => {
    const answer = new Answer('answer body');
    expect(answer.getBody()).toBe('answer body');
  });
});
