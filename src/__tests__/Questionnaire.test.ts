import Questionnaire from '../Questionnaire';

describe('Questionnaire test', () => {
  const questionnaire = new Questionnaire();
  it('addQuestion should increment questionnaire length', () => {
    const oldLength = questionnaire.length;
    questionnaire.addQuestion('question body');
    expect(questionnaire.length).toBe(oldLength + 1);
  });
  it('nextQuestion should return question body', () => {
    expect(questionnaire.nextQuestion()).toBe('question body');
  });
  it('nextQuestion should return undefined', () => {
    expect(questionnaire.nextQuestion()).toBeUndefined();
  });
  it('nextQuestion should return question body after reset', () => {
    questionnaire.reset();
    expect(questionnaire.nextQuestion()).toBe('question body');
  });
});
