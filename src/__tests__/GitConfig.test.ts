import GitConfig from '../GitConfig';

describe('GitConfig test', () => {
  it('test getters', () => {
    const config = new GitConfig();
    const testUser = {
      email: 'john@example.com',
      name: 'John',
    };
    const remote = {
      name: 'origin',
      url: 'https://github.com/john/example.git',
    };
    config.setUserData(testUser.name, testUser.email);
    expect(config.getUserData()).toEqual(testUser);
    config.addRemote(remote.name, remote.url);
    expect(config.getRemote(remote.name)).toEqual(remote);
  });
});
