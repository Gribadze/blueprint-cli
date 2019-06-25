import GitAccessor from '../GitAccessor';

describe('GitAccessor test', () => {
  it('test path setter and getter', () => {
    const gitAccessor = new GitAccessor();
    const testPath = '~/.ssh/id_rsa';
    gitAccessor.setPathToPrivateKey(testPath);
    expect(gitAccessor.getPathToPrivateKey()).toBe(testPath);
  });
});
