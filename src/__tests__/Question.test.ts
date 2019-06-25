import Question from '../Question';

describe('Question test', () => {
  it('getter test', () => {
    const question = new Question('question body');
    expect(question.getBody()).toBe('question body');
  });
});
