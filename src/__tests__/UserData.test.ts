import UserData from '../UserData';

describe('UserData test', () => {
  it('test name setter and getter', () => {
    const userData = new UserData();
    const testName = 'John';
    userData.setName(testName);
    expect(userData.getName()).toBe(testName);
  });
  it('test email setter and getter', () => {
    const userData = new UserData();
    const testMail = 'john@example.com';
    userData.setEmail(testMail);
    expect(userData.getEmail()).toBe(testMail);
  });
});
